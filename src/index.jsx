import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import  moviesApp  from "./reducers/reducers";
import { devToolsEnhancer } from 'redux-devtools-extension';
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  rootElement
);
