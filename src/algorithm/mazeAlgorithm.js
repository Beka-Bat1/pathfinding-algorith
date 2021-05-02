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

export function generateRandomWalls(grid) {
  let visitedNodesInOrder = [];

  grid.map((row) => {
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

export function generateMaze(grid) {
  let visitedNodesInOrder = [];
  let nodesToVisit = [];

  let nodes = getAllNodes(grid);
  // take out first node
  let currentNode = nodes[0];
  currentNode.isVisited = true;
  // stack
  nodesToVisit.push(currentNode);

  while (!!nodesToVisit) {
      currentNode = nodesToVisit.pop();

    let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

     unvisitedNeighbors = unvisitedNeighbors.filter(n => n.isStart ? null : n.isFinish ? null : n);
    
    let currentNeighbor = unvisitedNeighbors[0];
    console.log(unvisitedNeighbors)

    if (currentNeighbor) {
        nodesToVisit.push(currentNode);

      // leave only one path to only one neighbor and build wall around
      for (let otherNeighbour of unvisitedNeighbors) {
        if (otherNeighbour !== currentNeighbor) {
          otherNeighbour.isVisited = true;
          visitedNodesInOrder.push(otherNeighbour);
        }
      }
      // go to neighbor, put neighbor in nodeToVisit stack and choose as currentNode
      currentNode = currentNeighbor;
      currentNode.isVisited = true;
      nodesToVisit.push(currentNode);
    } else {
        return visitedNodesInOrder;
    }
  }

  return visitedNodesInOrder;
}

//   for (let row of grid) {
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

//   let nodes = grid.slice();

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

// let rowStart = 0;
// let rowEnd = 19;
// let colStart = 0;
// let colEnd = 49;

// let orientation = 'horizontal';

// let surroundingWalls = false

// let type = 'wall';

// let wallsToAnimate = [];

// if (!surroundingWalls) {
//   let relevantIds = [startNode, finishNode];
//   if (board.object) relevantIds.push(board.object);
//   Object.keys(board.nodes).forEach(node => {
//     if (!relevantIds.includes(node)) {
//       let r = parseInt(node.split("-")[0]);
//       let c = parseInt(node.split("-")[1]);
//       if (r === 0 || c === 0 || r === board.height - 1 || c === board.width - 1) {
//         let currentHTMLNode = document.getElementById(node);
//         wallsToAnimate.push(currentHTMLNode);
//         if (type === "wall") {
//           board.nodes[node].status = "wall";
//           board.nodes[node].weight = 0;
//         } else if (type === "weight") {
//           board.nodes[node].status = "unvisited";
//           board.nodes[node].weight = 15;
//         }
//       }
//     }
//   });
//   surroundingWalls = true;
// }
// if (orientation === "horizontal") {
//   let possibleRows = [];
//   for (let number = rowStart; number <= rowEnd; number += 2) {
//     possibleRows.push(number);
//   }
//   let possibleCols = [];
//   for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
//     possibleCols.push(number);
//   }
//   let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
//   let randomColIndex = Math.floor(Math.random() * possibleCols.length);
//   let currentRow = possibleRows[randomRowIndex];
//   let colRandom = possibleCols[randomColIndex];
//   Object.keys(board.nodes).forEach(node => {
//     let r = parseInt(node.split("-")[0]);
//     let c = parseInt(node.split("-")[1]);
//     if (r === currentRow && c !== colRandom && c >= colStart - 1 && c <= colEnd + 1) {
//       let currentHTMLNode = document.getElementById(node);
//       if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
//         board.wallsToAnimate.push(currentHTMLNode);
//         if (type === "wall") {
//           board.nodes[node].status = "wall";
//           board.nodes[node].weight = 0;
//         } else if (type === "weight") {
//           board.nodes[node].status = "unvisited";
//           board.nodes[node].weight = 15;
//         }        }
//     }
//   });
//   if (currentRow - 2 - rowStart > colEnd - colStart) {
//     recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, type);
//   } else {
//     recursiveDivisionMaze(board, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls, type);
//   }
//   if (rowEnd - (currentRow + 2) > colEnd - colStart) {
//     recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, type);
//   } else {
//     recursiveDivisionMaze(board, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls, type);
//   }
// } else {
//   let possibleCols = [];
//   for (let number = colStart; number <= colEnd; number += 2) {
//     possibleCols.push(number);
//   }
//   let possibleRows = [];
//   for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
//     possibleRows.push(number);
//   }
//   let randomColIndex = Math.floor(Math.random() * possibleCols.length);
//   let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
//   let currentCol = possibleCols[randomColIndex];
//   let rowRandom = possibleRows[randomRowIndex];
//   Object.keys(board.nodes).forEach(node => {
//     let r = parseInt(node.split("-")[0]);
//     let c = parseInt(node.split("-")[1]);
//     if (c === currentCol && r !== rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
//       let currentHTMLNode = document.getElementById(node);
//       if (currentHTMLNode.className !== "start" && currentHTMLNode.className !== "target" && currentHTMLNode.className !== "object") {
//         board.wallsToAnimate.push(currentHTMLNode);
//         if (type === "wall") {
//           board.nodes[node].status = "wall";
//           board.nodes[node].weight = 0;
//         } else if (type === "weight") {
//           board.nodes[node].status = "unvisited";
//           board.nodes[node].weight = 15;
//         }        }
//     }
//   });
//   if (rowEnd - rowStart > currentCol - 2 - colStart) {
//     recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls, type);
//   } else {
//     recursiveDivisionMaze(board, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, type);
//   }
//   if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
//     recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls, type);
//   } else {
//     recursiveDivisionMaze(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, type);
//   }
// }
