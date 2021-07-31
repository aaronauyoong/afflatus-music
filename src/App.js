import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Nav from "./components/nav/Nav";
// import Home from "./components/homepage/Home";
// import Login from "./components/login/Login";
// import Profile from "./components/footer/Profile";
// import Footer from "./components/footer/Footer";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

// getting URL param called 'code'
const code = new URLSearchParams(window.location.search).get("code");

function App() {
	return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
