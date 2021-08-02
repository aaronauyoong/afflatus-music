import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./components/nav/Nav";
// import Home from "./components/homepage/Home";
// import Login from "./components/login/Login";
// import Profile from "./components/footer/Profile";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

// Refresh page brings back to login page - need fix

// getting URL param called 'code'
const code = new URLSearchParams(window.location.search).get("code");
console.log(code)

function App() {
	return (
		<div className="afflatus-music">
			<Nav />
			<main>
				<Router>
					<Switch>
						<Route exact path="/">
							{code ? <Dashboard code={code}/> : <Login />}
						</Route>
						{/* <Route exact path="/profile" component={Profile} /> */}
					</Switch>
				</Router>
			</main>
		</div>
	);
}

// Original with Ternary Operator
// function App() {
// 	return code ? (
// 		<div>
// 			<Nav />
// 			<Dashboard code={code}></Dashboard>
// 		</div>
// 	) : (
// 		<div>
// 			<Nav />
// 			<Login />
// 		</div>
// 	);
// }

export default App;