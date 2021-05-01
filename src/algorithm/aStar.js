import { getAllNodes, sortNodesByDistance, getUnvisitedNeighbors } from "./basicFuncs/basicFunctions";

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
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

function manhattanDistance(currentNode, finishNode) {
  let row = Math.abs(finishNode.row - currentNode.row);
  let col = Math.abs(finishNode.col - currentNode.col);
  return row + col;
}
