
# Warehouse routing visualization tool

![](header.png)

[Demo](https://bwdvolde.github.io/warehouse-visualization/)

## About

This is a rewrite of a warehouse routing visualisation tool I built for my master's thesis. 
Notable technologies that are used are d3.js, vue and bootstrap. 

In this application, a warehouse and its underlying graph are shown. 
Each rectangle represents a storage cell in the warehouse. 
Each storage cell has a color that indicates how urgently it has to be scanned. 
The white circles that are moving in the graph represent drones that scan the storage cells.
After a storage cell has been scanned, its color wil reset to green. 

There are various possible algorithms that can calculate how the storage cells should be scanned. 
I've implemented some simple algorithms to illustrate how the tool can be used. These algorithms are briefly described below. 

* **Serial**: Scan the storage cells in warehouse column per column.
* **Random**: Move to a random direction in the graph and scan the storage cell there.

### Other notable features

* The simulation can essentially be viewed as a video. This means that it is possible to speedup the simulation speed, 
move to an arbitrary moment in the simulation, etc.
* Custom configurations can easily be created with different warehouse dimensions, different durations etc.
* The warehouse automatically (re)scales to fit the screen size.

## Getting started

### Requirements

* Node 13 (unverified on other versions)

### Installation

1. Install required dependencies

   ```
   npm install
   ```

2. Run application
    
   ```
   npm start
   ```

3. Open `http://localhost:8080` in your browser
