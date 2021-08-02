import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { ProvideAuth } from "./use-auth.js";

import Nav from "./components/nav/Nav";
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

// www.afflatus.com/dashboard=?code1234kjsdnclkjsdscope

function App() {
	return code ? (
		<div>
			<Nav />
			<Dashboard code={code}></Dashboard>
		</div>
	) : (
		<div>
			<Nav />
			<Login />
		</div>
	);
}

export default App;
