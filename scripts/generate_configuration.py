from scripts.class_definitions import Model, Settings, Cell, Drone

aisles = 4
blocks = 4
cells_per_block = 4

rows = blocks * (cells_per_block + 1) + 1
cols = aisles * 2

settings = Settings(aisles, blocks, cells_per_block)
cells = [Cell(row, col, row % (cells_per_block + 1) != 0, -50000) for row in range(rows) for col in range(cols)]

drones = [
    Drone(id="Drone 1", row=0, col=0, speed=1, operations=["SOUTH", "SOUTH", "SOUTH", "SOUTH", "SOUTH", "SOUTH"])
]

model = Model(settings, cells, drones)
print(model.json())
