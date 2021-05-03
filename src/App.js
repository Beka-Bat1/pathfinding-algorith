import React from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PathfindingVisualizer />
      </div>
    );
  }
}

export default App;
