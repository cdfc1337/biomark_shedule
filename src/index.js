import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // ✅ Importing App correctly

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
