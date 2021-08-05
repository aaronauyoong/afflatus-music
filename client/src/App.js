import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
// import Home from "./components/homepage/Home";
// import Login from "./components/login/Login";
// import Profile from "./components/footer/Profile";
import { StoreProvider } from "./utils/GlobalState";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import UserPlaylists from "./components/playlist/GetUserPlaylists";

const client = new ApolloClient({
	uri: "https://localhost:3000",
	cache: new InMemoryCache(),
});

// Refresh page brings back to login page - need fix

// getting URL param called 'code'
const code = new URLSearchParams(window.location.search).get("code");
const authCode = window.localStorage.setItem('code', code);
// const authCode = localStorage.getItem("code");
// console.log(authCode)

function App() {
	return (
		<ApolloProvider client={client}>
			<StoreProvider>
				<div className="afflatus-music">
					<Nav />
					<main>
						<Router>
							<Switch>
								<Route exact path="/" code={code}>
									{code ? <Dashboard authCode={code} /> : <Login />}
								</Route>
								{/* <Route exact path="/">
									{code ? <Dashboard code={code} /> : <Login />}
								</Route> */}
								{/* <Route exact path="/myplaylists" component={UserPlaylists}code={code}>
									{code ? <UserPlaylists authCode={code} /> : <Login />}
								</Route> */}
								<Route exact path="/myplaylists" component={UserPlaylists}code={code}>
									{/* {code ? <UserPlaylists code={authCode} /> : <Login />} */}
								</Route>
							</Switch>
						</Router>
					</main>
				</div>
			</StoreProvider>
		</ApolloProvider>
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
