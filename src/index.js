import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "react-router-dom";
import { createStore } from "./app/store/createStore";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import history from "./app/utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router history={history}>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
