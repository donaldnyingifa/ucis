import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import { app } from "./firebase";
import FirebaseContext from "./components/firebase/context";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <FirebaseContext.Provider value={app}>
  <App />
</FirebaseContext.Provider>
, document.getElementById("root"));
