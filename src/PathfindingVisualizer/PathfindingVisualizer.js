import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithm/dijkstra";
import { astar } from "../algorithm/aStar";
import { dfs } from "../algorithm/dfs";
import { bfs } from "../algorithm/bfs";
import "./PathfindingVisualizer.css";
import {
  generateRandomWalls,
  generateMaze,
  mazeAnimation,
} from "../algorithm/mazeAlgorithm";

export default class PathfindingVisualizer extends Component {
  state = {
    START_NODE_ROW: 10,
    START_NODE_COL: 15,
    FINISH_NODE_ROW: 10,
    FINISH_NODE_COL: 35,
    grid: [],
    currRow: 1,
    currCol: 1,
    mouseIsPressed: false,
    whichNodeIsPicked: "",
    isRunning: false,
  };

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid: grid });
  }

  // handleMouseDown(row, col) {
  //   let startNodePicked = Boolean(this.state.grid[row][col].isStart);
  //   let endNodePicked = Boolean(this.state.grid[row][col].isFinish);
  //   if (startNodePicked) {
  //     this.setState({ whichNodeIsPicked: "isStart" });
  //     setTimeout(() => {console.log(this.state.whichNodeIsPicked)}, 1000)

  //   } else if (endNodePicked) {
  //     this.setState({ whichNodeIsPicked: "isFinish" });
  //   } else if (!startNodePicked || !endNodePicked) {
  //     console.log('you chose a wall ... ')
  //     this.setState({ whichNodeIsPicked: "isWall" });
  //   }
  //   const newGrid = getNewGridWithWallToggled(
  //     this.state.grid,
  //     row,
  //     col,
  //     this.state.whichNodeIsPicked
  //   );
  //   this.setState({ mouseIsPressed: true, grid: newGrid });
  // }

  // handleMouseEnter(row, col) {
  //    if (!this.state.mouseIsPressed) return;
  //   console.log('time to change on Mouse Enter ...')
  //   const newGrid = getNewGridWithWallToggled(
  //     this.state.grid,
  //     row,
  //     col,
  //     this.state.whichNodeIsPicked
  //   );
  //   this.setState({ grid: newGrid });
  // }

  // handleMouseLeave(row, col) {
  //   if (this.state.whichNodeIsPicked !== 'isStart' && this.state.whichNodeIsPicked !== 'isFinish') return;
  //     console.log('time to chenge node position on mouse leave .....')
  //     const newGrid = getNewGridWithWallToggled(
  //       this.state.grid,
  //       row,
  //       col,
  //       this.state.whichNodeIsPicked
  //     );
  //     this.setState({ grid: newGrid });
  // }

  // handleMouseUp() {
  //   if (this.state.whichNodeIsPicked !== "isWall") {
  //     console.log('asdasdasda')
  //     this.setState({ whichNodeIsPicked: '' });
  //     setTimeout(() => {console.log(this.state.whichNodeIsPicked)}, 1000)
  //   }
  //   this.setState({ mouseIsPressed: false });
  // }

  /******************** Control mouse events ********************/
  handleMouseDown(row, col) {
    console.log(this.state.isRunning);
    console.log(this.state.grid[row][col]);
    if (!this.state.isRunning) {
      if (this.isGridClear()) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-start"
        ) {
          this.setState({
            mouseIsPressed: true,
            isStartNode: true,
            currRow: row,
            currCol: col,
          });
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-finish"
        ) {
          this.setState({
            mouseIsPressed: true,
            isFinishNode: true,
            currRow: row,
            currCol: col,
          });
        } else {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({
            grid: newGrid,
            mouseIsPressed: true,
            isWallNode: true,
            currRow: row,
            currCol: col,
          });
        }
      } else {
        this.clearGrid();
      }
    }
  }

  isGridClear() {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName === "node node-visited" ||
          nodeClassName === "node node-shortest-path"
        ) {
          return false;
        }
      }
    }
    return true;
  }

  handleMouseEnter(row, col) {
    if (!this.state.isRunning) {
      if (this.state.mouseIsPressed) {
        const nodeClassName = document.getElementById(`node-${row}-${col}`)
          .className;
        if (this.state.isStartNode) {
          if (nodeClassName !== "node node-wall") {
            const prevStartNode = this.state.grid[this.state.currRow][
              this.state.currCol
            ];
            prevStartNode.isStart = false;
            document.getElementById(
              `node-${this.state.currRow}-${this.state.currCol}`
            ).className = "node";

            this.setState({ currRow: row, currCol: col });
            const currStartNode = this.state.grid[row][col];
            currStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-start";
          }
          this.setState({ START_NODE_ROW: row, START_NODE_COL: col });
        } else if (this.state.isFinishNode) {
          if (nodeClassName !== "node node-wall") {
            const prevFinishNode = this.state.grid[this.state.currRow][
              this.state.currCol
            ];
            prevFinishNode.isFinish = false;
            document.getElementById(
              `node-${this.state.currRow}-${this.state.currCol}`
            ).className = "node";

            this.setState({ currRow: row, currCol: col });
            const currFinishNode = this.state.grid[row][col];
            currFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-finish";
          }
          this.setState({ FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
        } else if (this.state.isWallNode) {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({ grid: newGrid });
        }
      }
    }
  }

  handleMouseUp(row, col) {
    if (!this.state.isRunning) {
      this.setState({ mouseIsPressed: false });
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({
          isStartNode,
          START_NODE_ROW: row,
          START_NODE_COL: col,
        });
      } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({
          isFinishNode,
          FINISH_NODE_ROW: row,
          FINISH_NODE_COL: col,
        });
      }
      // this.componentDidMount();
    }
  }

  handleMouseLeave() {
    if (this.state.isStartNode) {
      const isStartNode = !this.state.isStartNode;
      this.setState({ isStartNode, mouseIsPressed: false });
    } else if (this.state.isFinishNode) {
      const isFinishNode = !this.state.isFinishNode;
      this.setState({ isFinishNode, mouseIsPressed: false });
    } else if (this.state.isWallNode) {
      const isWallNode = !this.state.isWallNode;
      this.setState({ isWallNode, mouseIsPressed: false });
      this.componentDidMount();
    }
  }

  /* mouse evets ^ */

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  createNode = (col, row) => {
    return {
      col,
      row,
      isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish:
        row === this.state.FINISH_NODE_ROW &&
        col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  clearGrid() {
    console.log(this.state.isRunning);
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
            node.isWall = false;
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
      this.setState({ grid: newGrid });
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log(visitedNodesInOrder);
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
    this.setState({ isRunning: false });
  }

  visualizeAlgorithm(algorithmName) {
    const { grid } = this.state;
    this.setState({ isRunning: true });
    const startNode =
      grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode =
      grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];

    let visitedNodesInOrder;
    let nodesInShortestPathOrder;

    switch (algorithmName) {
      case "dijkstra":
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
      case "randomWalls":
        let tmp = generateRandomWalls(grid, startNode, finishNode);
        mazeAnimation(tmp);
        this.setState({ isRunning: false });
        return;
      case "maze":
         let wallsToAnimate = generateMaze(grid);
        mazeAnimation(wallsToAnimate);
        this.setState({ isRunning: false });
        return;
      default:
        break;
    }
    console.log("still continued ..............");
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
        <button onClick={() => this.visualizeAlgorithm("randomWalls")}>
          Deploy random walls
        </button>
        <button onClick={() => this.visualizeAlgorithm("maze")}>
          Generate Maze
        </button>
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
                      onMouseUp={() => this.handleMouseUp(row, col)}
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

// helps MOUSE EVENTS with changing node properties
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish) {
    let newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};
