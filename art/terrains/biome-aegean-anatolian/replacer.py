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

for i in os.scandir("."):
    if i.is_file()  and str(i.name).endswith(".xml") and ("terrains.xml" not in str(i.name)):
        with open(i.name, "w") as f:
            f.write(content)
            print("content written to ", i.name)

