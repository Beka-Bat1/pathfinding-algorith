import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithm/dijkstra";
import { astar } from "../algorithm/aStar";
import { dfs } from "../algorithm/dfs";
import { bfs } from "../algorithm/bfs";
import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    whichNodeIsPicked: null,
    isRunning: false,
  };

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid: grid });
  }

  handleMouseDown(row, col) {
    let startNodePicked = Boolean(this.state.grid[row][col].isStart);
    let endNodePicked = Boolean(this.state.grid[row][col].isFinish);
    if (startNodePicked) {
      console.log("startNode is Picked");
      // document.getElementById(`node-${row}-${col}`).className = 'node';
      this.setState({ whichNodeIsPicked: "isStart" });
      console.log(this.state.whichNodeIsPicked);
    } else if (endNodePicked) {
      document.getElementById(`node-${row}-${col}`).className = "node";
      this.setState({ whichNodeIsPicked: "isFinish" });
    } else if (!startNodePicked || !endNodePicked) {
      this.setState({ whichNodeIsPicked: "isWall" });
    }
    const newGrid = getNewGridWithWallToggled(
      this.state.grid,
      row,
      col,
      this.state.whichNodeIsPicked
    );
    this.setState({ mouseIsPressed: true, grid: newGrid });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    const newGrid = getNewGridWithWallToggled(
      this.state.grid,
      row,
      col,
      this.state.whichNodeIsPicked
    );
    this.setState({ grid: newGrid });
  }

  handleMouseLeave(row, col) {
    if (this.state.mouseIsPressed) {
      const newGrid = getNewGridWithWallToggled(
        this.state.grid,
        row,
        col,
        this.state.whichNodeIsPicked
      );
      this.setState({ grid: newGrid });
      console.log("mouse left the node");
    }
  }

  handleMouseUp() {
    if (this.state.whichNodeIsPicked !== "isWall") {
      this.setState({ whichNodeIsPicked: null });
    }
    this.setState({ mouseIsPressed: false });
  }

  clearGrid() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (let row of newGrid) {
        for (let node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-finish" ||
            nodeClassName !== "node node-start" ||
            nodeClassName !== "node node-wall"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isVisited = false;
            node.distance = Infinity;
          }
          if (nodeClassName === "node node-finish") {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-finish";
            node.isVisited = false;
            node.distance = Infinity;
          }
          if (nodeClassName === "node node-start") {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-start";
            node.isVisited = false;
            node.distance = Infinity;
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length - 1; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeAlgorithm(algorithmName) {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    let visitedNodesInOrder;
    let nodesInShortestPathOrder;

    switch (algorithmName) {
      case "dijkstra":
        // const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;

      case "aStar":
        visitedNodesInOrder = astar(grid, startNode, finishNode);
        break;

      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;

      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        break;

      default:
        break;
    }
    nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeAlgorithm("dijkstra")}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeAlgorithm("aStar")}>
          Visualize A* Algorithm
        </button>
        <button onClick={() => this.visualizeAlgorithm("dfs")}>
          Visualize Depth First Search Algorithm
        </button>
        <button onClick={() => this.visualizeAlgorithm("bfs")}>
          Visualize Breadth First Search Algorithm
        </button>
        <button onClick={() => this.clearGrid()}>Clear Graph</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseLeave={(row, col) =>
                        this.handleMouseLeave(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// helps MOUSE EVENTS with changing node properties
const getNewGridWithWallToggled = (grid, row, col, whichNodeIsPicked) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  let newNode = {
    ...node,
    isWall: whichNodeIsPicked === "isWall" ? !node.isWall : node.isWall,
    isStart: whichNodeIsPicked === "isStart" ? !node.isStart : node.isStart,
    isFinish: whichNodeIsPicked === "isFinish" ? !node.isFinish : node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
