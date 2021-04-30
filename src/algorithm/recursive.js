bool Recursive_DFS(Maze maze, Node start, Node end)
{
  // Terminate if the goal is reached
  if (start == end)
    return true;
  // Visite current node
  start.visite = true;
  // Take unvisited neighbors in order
  auto neighbors = start.GetUnvisitedNeighbors();
  for (auto i = 0; i < neighbors.size(); ++i)
  {
    neighbors[i].parent = start;
    // Recurse and Terminate if the goal is reached
    if (Recursive_DFS(maze, neighbors[i], end)) return true;
  }
  return false;
}