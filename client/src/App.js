import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import useAuth from "./utils/useAuth";
// import { StoreProvider } from "../../temp/GlobalState";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages Imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExploreTimeline from "./pages/ExploreTimeline";

// Components Imports
import Nav from "./components/nav/Nav";
import MyPlaylists from "./components/playlist/GetUserPlaylists";
import SpotifyLogin from "./components/login/SpotifyLogin";
import Dashboard from "./components/dashboard/Dashboard";
import SpotifyDashboard from "./components/dashboard/SpotifyDashboard";

const httpLink = createHttpLink({
	uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

// const code =
// 	window.localStorage.getItem("code") ??
// 	new URLSearchParams(window.location.search).get("code");
// window.localStorage.setItem("code", code);

const code = new URLSearchParams(window.location.search).get("code");
console.log("This is the code retrieved from URLSearchParams ----->", code);
// localStorage.setItem("code", code);
// const getSpotifyCode = localStorage.getItem("code")
// console.log("This is the code retrieved from localStorage ----->", getSpotifyCode)

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="afflatus-music">
						<Nav />
						<main>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/signup" component={Signup} />
								<Route exact path="/dashboard" component={Dashboard} />
								<Route exact path="/myplaylists" component={MyPlaylists} />
								<Route exact path="/spotifylogin" component={SpotifyLogin} />
								<Route
									exact
									path="/spotifydashboard"
									code={code}
								>
									{code ? <SpotifyDashboard /> : <SpotifyLogin />}
								</Route>
								<Route
									exact
									path="/exploretimeline"
									component={ExploreTimeline}
								/>
							</Switch>
						</main>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
