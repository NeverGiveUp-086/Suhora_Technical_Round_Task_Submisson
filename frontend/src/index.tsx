import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import ReactDOM from 'react-dom/client';
import React from "react";

const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);