import { getUnvisitedNeighbors } from "./basicFuncs/basicFunctions";

export function bfs(grid, startNode, finishNode) {
  // Put the start node in the queue
  startNode.isVisited = true;
  startNode.distance = 0;
  const visitedNodesInOrder = [];

  const unvisitedNeighbors = [];
  unvisitedNeighbors.push(startNode);
  // While there is node to be handled in the queue
  while (!!unvisitedNeighbors.length) {
    // Handle the node in the front of the line
    let currentNode = unvisitedNeighbors.shift();

    // check as it's not a wall
    if (!currentNode.isWall) {
      visitedNodesInOrder.push(currentNode);

      // Terminate if the goal is reached
      if (currentNode === finishNode || currentNode === undefined){
        return visitedNodesInOrder;
      } 
      // Terminate if goal can't be reached
      if (currentNode.distance === Infinity) return visitedNodesInOrder;
      // Handle neighbors

      let neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (let i = 0; i < neighbors.length; ++i) {
        let neighbor = neighbors[i];
        if (neighbor.isWall) continue;
        neighbor.isVisited = true;
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
        unvisitedNeighbors.push(neighbor);
      }
    }
  }
  // Done ! At this point we just have to walk back from the end using the parent
  // If end does not have a parent, it means that it has not been found.
}
