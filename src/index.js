import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/assets/css/common.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const { persistStore, persistReducer } = require("redux-persist");

const rootReducer = combineReducers({
  key: "value",
});

let devtools, store;
const isClient = typeof window !== "undefined";
if (isClient) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

  const storage = require("redux-persist/lib/storage").default;
  const persistConfig = {
    key: "instant-space",
    storage,
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(applyMiddleware(thunk), devtools)
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
