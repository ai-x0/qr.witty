import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import './mobile.scss'
import App from "./components/app/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { createStore } from "redux";

import $event from "./utils/$event";
import { saveImg, saveSvg } from "./utils/downloader";
import { getParamDetailedValue, outerHtml } from "./utils/util";
import firebase from "./utils/firebase";
import './locales/i18n';

const store = createStore(rootReducer);

let timeout = null;

store.subscribe(() => {
  let xstate = store.getState();

  let oHtml = outerHtml(xstate.selectedIndex);
  if (!oHtml) {
    return;
  }

  clearTimeout(timeout);

  // 下一个循环 渲染数据
  timeout = setTimeout(() => {
    saveImg(
      xstate.value,
      outerHtml(xstate.selectedIndex),
      500,
      500,
      "jpg",
      "onlyCreate"
    ).then((res) => {
      $event.emit("generate_image", res);
    });
  }, 100);

});

firebase();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
