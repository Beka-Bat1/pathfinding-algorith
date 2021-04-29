import React, { Component } from "react";
import './PathfindingVisualizer.css'
import Node from "./Node/Node";


export default class PathfindingVisualizer extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
  };

  componentDidMount() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 45; col++) {
        currentRow.push([]);
      }
      grid.push(currentRow);
    }
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;
    console.log(grid);
    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => <Node key={nodeIdx} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
