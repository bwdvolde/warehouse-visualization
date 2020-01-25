from scripts.class_definitions import Model, Settings, Cell, Drone, SCAN, EAST, SOUTH, NORTH

# Settings
aisles = 4
blocks = 4
cells_per_block = 5
settings = Settings(aisles, blocks, cells_per_block)

# Derived settings
rows = blocks * (cells_per_block + 1) + 1
cols = aisles * 2


def is_cross_aisle(y):
    return y % (cells_per_block + 1) == 0


def is_last_row(y):
    return y == rows - 1


def make_serial_scanning_operations():
    operations = []
    for x in range(cols):
        for y in range(rows):
            if not is_cross_aisle(y):
                operations.append(SCAN)

            if is_last_row(y):
                operations.append(EAST)
            elif not x % 2:
                operations.append(SOUTH)
            else:
                operations.append(NORTH)

    # Remove last operation because we don't want to go right after last scan
    operations.pop()

    return operations


cells = [Cell(x, y, not is_cross_aisle(y), -50000) for y in range(rows) for x in range(cols)]
drones = [Drone(id="Drone 1", x=0, y=0, speed=1, operations=make_serial_scanning_operations())]
model = Model(settings, cells, drones)

with open("../public/configurations/default.json", "w") as file:
    file.write(model.json())
