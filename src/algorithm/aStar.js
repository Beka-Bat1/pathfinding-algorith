import { getAllNodes, sortNodesByDistance } from "./basicFuncs/basicFunctions";

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.totalDistance = 0;
  startNode.direction = "up";
  let unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    // get sorted array by distance
    sortNodesByDistance(unvisitedNodes);
    // get closes node
    const closestNode = unvisitedNodes.shift();

    if (!closestNode.isWall) {
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
  }
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distanceToFinishNode = manhattanDistance(neighbor, finishNode);
    neighbor.distance = node.distance + 1 + neighbor.distanceToFinishNode;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  // up
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // down
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // left
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // right
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function manhattanDistance(currentNode, finishNode) {
  let row = Math.abs(finishNode.row - currentNode.row);
  let col = Math.abs(finishNode.col - currentNode.col);

  return row + col;
}
