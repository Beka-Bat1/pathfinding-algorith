import { getqueue, getUnvisitedNeighbors } from "./basicFuncs/basicFunctions";

export function bfs(grid, startNode, finishNode) {
  startNode.distance = 0;
  const visitedNodesInOrder = [];

  const queue = [];
  // Put the start node in the queue
  queue.push(startNode);
  // While there is node to be handled in the queue
  while (!!queue.length) {
    // Handle the node in the front of the line
    let currentNode = queue.shift();

    // check if it's not a wall
    if (currentNode.isWall || currentNode.isVisited) continue;

    // Handle neighbors
    visitedNodesInOrder.push(currentNode);
    currentNode.isVisited = true;
    
    // Terminate if the goal is reached
    if (
      currentNode === finishNode ||
      currentNode === undefined ||
      currentNode.idstance === Infinity
    ) {
      return visitedNodesInOrder;
    }

    let neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      // neighbor.isVisited = true;
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }

  console.log("return");
  return visitedNodesInOrder;
  // Done ! At this point we just have to walk back from the end using the parent
  // If end does not have a parent, it means that it has not been found.
}
