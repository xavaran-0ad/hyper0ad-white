/**
 * Works similarly to the ChainPlacer, but instead of having a predefined number
 * of circles that are placed, the IncrementalChainPlacer will stop once a
 * condition has been reached on the current placed points.
 */
function IncrementalChainPlacer(minRadius, maxRadius, stopCondition, failFraction = 0, centerPosition = undefined, maxDistance = 0, queue = [], maxConsecutiveFail = 100)
{
	this.minRadius = minRadius;
	this.maxRadius = maxRadius;
	this.stopCondition = stopCondition;
	this.failFraction = failFraction;
	this.maxDistance = maxDistance;
	this.queue = queue.map(radius => Math.floor(radius));
	this.maxConsecutiveFail = maxConsecutiveFail
	this.centerPosition = undefined;

	if (centerPosition)
		this.setCenterPosition(centerPosition);
}

IncrementalChainPlacer.prototype.setCenterPosition = function(position)
{
	this.centerPosition = deepfreeze(position.clone().round());
};

IncrementalChainPlacer.prototype.place = function(constraint)
{
	// Preliminary bounds check
	if (!g_Map.inMapBounds(this.centerPosition) || !constraint.allows(this.centerPosition))
		return undefined;

	let points = [];
	let auxTc = g_Map.createTileClass();
	let size = g_Map.getSize();
	let failed = 0;
	let consecutiveFailed = 0;
	let count = 0;

	let gotRet = new Array(size).fill(0).map(p => new Array(size).fill(-1));
	--size;

	this.minRadius = Math.min(this.maxRadius, Math.max(this.minRadius, 1));

	let edges = [this.centerPosition];

	while (!this.stopCondition(points, auxTc))
	{
		let chainPos = pickRandom(edges);
		let radius = this.queue.length ? this.queue.pop() : randIntInclusive(this.minRadius, this.maxRadius);
		let radius2 = Math.square(radius);

		let bbox = getPointsInBoundingBox(getBoundingBox([
			new Vector2D(Math.max(0, chainPos.x - radius), Math.max(0, chainPos.y - radius)),
			new Vector2D(Math.min(chainPos.x + radius, size), Math.min(chainPos.y + radius, size))
		]));

		for (let position of bbox)
		{
			if (position.distanceToSquared(chainPos) >= radius2)
				continue;

			++count;

			if (!g_Map.inMapBounds(position) || !constraint.allows(position))
			{
				++failed;
				++consecutiveFailed;
				if (consecutiveFailed >= this.maxConsecutiveFail)
					return undefined;
				
				continue;
			}

			let state = gotRet[position.x][position.y];
			if (state == -1)
			{
				consecutiveFailed = 0;
				points.push(position);
				auxTc.add(position);
				gotRet[position.x][position.y] = -2;
			}
			else if (state >= 0)
			{
				edges.splice(state, 1);
				gotRet[position.x][position.y] = -2;

				for (let k = state; k < edges.length; ++k)
					--gotRet[edges[k].x][edges[k].y];
			}
		}

		for (let pos of bbox)
		{
			if (this.maxDistance &&
			    (Math.abs(this.centerPosition.x - pos.x) > this.maxDistance ||
			     Math.abs(this.centerPosition.y - pos.y) > this.maxDistance))
				continue;

			if (gotRet[pos.x][pos.y] != -2)
				continue;

			if (pos.x > 0 && gotRet[pos.x - 1][pos.y] == -1 ||
			    pos.y > 0 && gotRet[pos.x][pos.y - 1] == -1 ||
			    pos.x < size && gotRet[pos.x + 1][pos.y] == -1 ||
			    pos.y < size && gotRet[pos.x][pos.y + 1] == -1)
			{
				edges.push(pos);
				gotRet[pos.x][pos.y] = edges.length - 1;
			}
		}
	}

	return failed > count * this.failFraction ? undefined : points;
};

function AvoidMapBoundsConstraint(distance)
{
	this.maxDistanceToCenter = (g_Map.getSize() / 2) - distance;
}

AvoidMapBoundsConstraint.prototype.allows = function(position)
{
	return g_Map.getCenter().distanceTo(position) < this.maxDistanceToCenter;
};

/**
 * Get points from the given area which are far enough from the border.
 * @param points - The input list of points.
 * @param tc - an auxiliary tileclass which contains the same points as the given area.
 *        it is given externally as it may be built incrementally, for performance.
 * @param distance - How far away the points should be from the border.
 */
function interiorPointList(points, tc, distance) {
    let constraint = new StayInTileClassConstraint(tc, distance);
	return points.filter(p => constraint.allows(p));
}

/**
 * Given a terrain, returns the probability that painting this terrain on a tile
 * will place a tree. This scales with the amount of wood the tree would
 * contain, from a standard of a 200 wood tree mapping to 1.
 */
function treeProbability(terrain) {
	if (Array.isArray(terrain)) 
		terrain = createTerrain(terrain);
	
	if (terrain instanceof SimpleTerrain)
		return terrain.templateName ? getResourceSupply(terrain.templateName) / 200 : 0;

	let mul = 1 / terrain.terrains.length;
	return terrain.terrains.map(t => mul * treeProbability(t)).reduce((p1, p2) => p1 + p2);
}

/**
 * Calculates in expectation how much wood a forest painted with the given area
 * will contain. If it is higher the number of trees we target, the stop
 * condition is fulfilled, and we stop growing the forest.
 */
function forestStopCondition(numTrees, borderTerrain, interiorTerrain) {
	let interiorTreeProb = treeProbability(interiorTerrain);
	let borderTreeProb = treeProbability(borderTerrain);
	let stopCondition = function(points, auxTc) {
		let numInteriorPoints = interiorPointList(points, auxTc, 2).length;
		let numBorderPoints = points.length - numInteriorPoints;
		return (interiorTreeProb * numInteriorPoints + borderTreeProb * numBorderPoints) >= numTrees;
	};
	return stopCondition;
}
