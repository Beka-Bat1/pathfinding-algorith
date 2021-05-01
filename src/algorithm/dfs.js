import { getUnvisitedNeighbors } from "./basicFuncs/basicFunctions";

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  let unvisitedNodes = [];
  // Put the start node in the stack
  startNode.distance = 0;
  startNode.isVisited = true
  unvisitedNodes.push(startNode);

  // While there is node to be handled in the queue
  while (!!unvisitedNodes) {
    // Handle the node in the front of the line
    const currentNode = unvisitedNodes.pop();
    // Terminate if the goal is reached
    if (currentNode === finishNode) return visitedNodesInOrder;
    // Take unvisited neighbors in order
    if (!currentNode.isWall) {
      if (currentNode.distance === Infinity) return visitedNodesInOrder;
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      if (currentNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(currentNode, grid, finishNode);
    }
  }

  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
      unvisitedNodes.push(neighbor)
    }
  }
 
}


