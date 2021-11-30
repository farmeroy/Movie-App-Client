import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import MainView from './components/MainView/main-view';

class MyFlixApp extends React.Component {
  render() {
    return (
        <MainView />
    );
  }
}

// Find the app root
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApp), container);
