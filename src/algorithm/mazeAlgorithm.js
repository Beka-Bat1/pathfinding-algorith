import {
  getAllNodes,
  getUnvisitedNeighbors,
} from "./basicFuncs/basicFunctions";
import { getNodesInShortestPathOrder } from "./dijkstra";

export function mazeAnimation(wallsToAnimate) {
  console.log(wallsToAnimate);

  let nodes = wallsToAnimate.slice();

  function timeout(index) {
    setTimeout(function () {
      if (index === nodes.length) {
        wallsToAnimate = [];
        return;
      }
      let node = nodes[index];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-wall";
      node.isWall = true;

      timeout(index + 1);
    }, 15);
  }

  timeout(0);
}

export function generateRandomWalls(nodes) {
  let visitedNodesInOrder = [];

  nodes.map((row) => {
    row.map((node) => {
      if (node.isStart || node.isFinish) return;
      let { col, row, ...nodeShit } = { ...node };

      if (Math.random() > 0.5) {
        visitedNodesInOrder.push(node);
      }
    });
  });

  console.log(visitedNodesInOrder);
  return visitedNodesInOrder;
}

export function generateMaze(
  nodes,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls,
  type,
  startNode,
  finishNode
) {
  let wallsToAnimate = [];
  if (rowEnd < rowStart || colEnd < colStart) {
    return wallsToAnimate;
  }



  if (!surroundingWalls) {
    let relevantIds = [startNode, finishNode];
    nodes.forEach((node) => {
      if (!relevantIds.includes(node)) {
        // let r = parseInt(node.id.split("-")[0]);
        // let c = parseInt(node.split("-")[1]);
        //   let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
        //   wallsToAnimate.push(currentHTMLNode);
        let r = node.row;
        let c = node.col;
        if (r === 0 || c === 0 || r === rowEnd - 1 || c === colEnd - 1) {
          wallsToAnimate.push(node);
          if (type === "wall") {
            node.isWall = true;
          }
        }
      }
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = rowStart + 1; number <= rowEnd - 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    nodes.forEach((node) => {
      let r = node.row;
      let c = node.col;

      if (
        r === currentRow &&
        c !== colRandom &&
        c >= colStart - 1 &&
        c <= colEnd + 1
      ) {
        if (node.isStart !== true && node.isFinish !== true) {
          wallsToAnimate.push(node);
          if (type === "wall") {
            node.isWall = true;
          }
        }
      }
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      generateMaze(
        nodes,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    } else {
      generateMaze(
        nodes,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      generateMaze(
        nodes,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    } else {
      generateMaze(
        nodes,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    nodes.forEach((node) => {
      let r = node.row;
      let c = node.col;
      if (
        c === currentCol &&
        r !== rowRandom &&
        r >= rowStart - 1 &&
        r <= rowEnd + 1
      ) {
        if (node.isStart !== true && node.isFinish !== true) {
          wallsToAnimate.push(node);
          if (type === "wall") {
            node.isWall = true;
          }
        }
      }
    });
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      generateMaze(
        nodes,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        type
      );
    } else {
      generateMaze(
        nodes,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        type
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      generateMaze(
        nodes,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        type
      );
    } else {
      generateMaze(
        nodes,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    }
  }
}

//   for (let row of nodes) {
//     for (let node of row) {
//       if (node.isStart || node.isFinish) continue;

//       if (Math.random() > 0.5) {
//         setTimeout(() => {
//           document.getElementById(`node-${node.row}-${node.col}`).className =
//             "node node-wall";
//           node.isWall = true;
//         }, 20);
//       }
//     }
//   }

//   let nodes = nodes.slice();

//   for (let i = 0; i <= nodes.length - 1; i++) {
//     for (let j = 0; j <= nodes[i].length - 1; j++) {
//       const node = nodes[i][j];

//       if (Math.random() > 0.5) continue;
//       if (node.isStart || node.isFinish) continue;
//       setTimeout(() => {
//         document.getElementById(`node-${node.row}-${node.col}`).className =
//           "node node-wall";
//         node.isWall = true;
//       }, 10 * i);
//     }
//   }
