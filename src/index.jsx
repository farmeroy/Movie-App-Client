import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

class MyFlixApp extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good Morning</div>
      </div>
    );
  }
}

// Find the app root
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApp), container);
