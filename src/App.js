import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Nav from "./components/nav/Nav";
// import Home from "./components/homepage/Home";
// import Login from "./components/login/Login";
// import Profile from "./components/footer/Profile";
// import Footer from "./components/footer/Footer";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login"

function App() {
	return (
		<div className="afflatus-music-app">
			<Login />
		</div>
	);
}

export default App;

// function App() {
// 	return (
// 		<div className="afflatus-music-app">
// 			<Nav />
// 			<main>
// 				<Router>
// 					<Switch>
// 						<Route exact path="/" component={Home} />
// 						<Route exact path="/login" component={Login} />
// 						<Route exact path="/profile" component={Profile} />
// 					</Switch>
// 				</Router>
// 			</main>
// 			<Footer />
// 		</div>
// 	);
// }
