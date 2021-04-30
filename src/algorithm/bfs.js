BFS(maze, startNode, endNode)
{
  // Put the start node in the queue
  start.visite = true;
  Queue queue(start);
  // While there is node to be handled in the queue
  while (!queue.empty())
  {
    // Handle the node in the front of the line 
     curNode = queue.pop();
    // Terminate if the goal is reached
    if (curNode == end)
      break;
    // Handle neighbors
     let neighbors = curNode.GetUnvisitedNeighbors();
    for (let i = 0; i < neighbors.size(); ++i)
    {
      neighbors[i].visite = true;
      neighbors[i].parent = curNode;
      queue.push(neighbors[i]);
    }
  }
  // Done ! At this point we just have to walk back from the end using the parent
  // If end does not have a parent, it means that it has not been found.
}