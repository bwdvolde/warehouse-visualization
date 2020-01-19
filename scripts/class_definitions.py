import json


class Model:

    def __init__(self, settings, cells, drones):
        self.settings = settings
        self.cells = cells
        self.drones = drones

    def json(self):
        return json.dumps({
            "settings": self.settings.json(),
            "cells": [cell.json() for cell in self.cells],
            "drones": [drone.json() for drone in self.drones]
        }, indent=4)


class Settings:

    def __init__(self, aisles, blocks, cellsPerBlock):
        self.aisles = aisles
        self.blocks = blocks
        self.cellsPerBlock = cellsPerBlock

    def json(self):
        return self.__dict__


class Drone:

    def __init__(self, id, row, col, speed, operations):
        self.id = id
        self.startPosition = {
            "row": row,
            "col": col
        }
        self.speed = speed
        self.operations = operations

    def json(self):
        return self.__dict__


class Cell:

    def __init__(self, row, col, isActive, timeAtLastScan):
        self.row = row
        self.col = col
        self.isActive = isActive
        self.timeAtLastScan = timeAtLastScan

    def json(self):
        return self.__dict__
