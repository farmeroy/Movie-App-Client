import React from "react";
import "./index.scss";
import MainView from "./components/MainView/main-view.jsx";
import Container from "react-bootstrap/Container";

const App = () => {
    return (
      <Container className="app-background">
        <MainView />
      </Container>

    )}

export default App;
