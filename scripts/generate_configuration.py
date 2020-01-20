from scripts.class_definitions import Model, Settings, Cell, Drone

aisles = 4
blocks = 4
cells_per_block = 4

rows = blocks * (cells_per_block + 1) + 1
cols = aisles * 2

settings = Settings(aisles, blocks, cells_per_block)
cells = [Cell(x, y, y % (cells_per_block + 1) != 0, -50000) for y in range(rows) for x in range(cols)]

drones = [
    Drone(id="Drone 1", x=0, y=0, speed=1, operations=["SOUTH", "SCAN", "SOUTH", "SCAN"])
]

model = Model(settings, cells, drones)
print(model.json())
