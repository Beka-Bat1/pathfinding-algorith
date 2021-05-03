import "./Navbar.css";
import React, { useState } from "react";

const Navbar = (props) => {
  const [disable, toggleDisable] = useState("");

  const buttonToggler = () => {
    if (disable) {
      toggleDisable("");
    } else {
      toggleDisable("disabled");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a href="" className="navbar-brand text-white ">
            Pathfinding algorithm Visualizer
          </a>
          <div className="row ms-2">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <button
                  className={`btn btn-secondary ${disable}`}
                  onClick={() => {
                    props.dijkstra();
                    buttonToggler();
                  }}
                >
                  Dijkstra's Algorithm
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-secondary ${disable}`}
                  onClick={() => {
                    props.aStar();
                    buttonToggler();
                  }}
                >
                  A* Algorithm
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-secondary ${disable}`}
                  onClick={() => {
                    props.dfs();
                    buttonToggler();
                  }}
                >
                  Depth-first Search
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-secondary ${disable}`}
                  onClick={() => {
                    props.bfs();
                    buttonToggler();
                  }}
                >
                  Breadth-first Search
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn btn-danger ${
                    disable === "" ? "disabled" : ""
                  }`}
                  onClick={() => {
                    props.clearGrid();
                    buttonToggler();
                  }}
                >
                  Clear Grid
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-secondary"
                  onClick={props.randomWalls}
                >
                  Deploy random walls
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-secondary"
                  onClick={props.generateMaze}
                >
                  Generate maze
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
