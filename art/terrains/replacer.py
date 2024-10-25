import os

content = """<?xml version="1.0" encoding="utf-8"?>
<terrain>
	<textures>
		<texture name="baseTex" file="types/black.png"/>
		<texture name="normTex" file="types/black.png"/>
		<texture name="specTex" file="types/black.png"/>
	</textures>
	<props size="60.0"/>
	<material>terrain_norm_spec.xml</material>
</terrain>

"""

for biome in os.scandir("."):
	#we are at top level, so we enter all dirs
	if biome.is_dir():
		#enter this directory and perform the re-write
		currentdir = os.path.join(".", biome.name)
		for i in os.scandir(currentdir):
			if i.is_file()  and str(i.name).endswith(".xml") and ("terrains.xml" not in str(i.name)):
				with open(os.path.join(currentdir, i.name), "w") as f:
					f.write(content)
					print("content written to ", i.name)

