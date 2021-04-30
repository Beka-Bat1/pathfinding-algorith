export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }

    return nodes;
  }

 export function sortNodesByDistance(unvisitedNodes) {
    // sort nodes by distance of ascending order
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }