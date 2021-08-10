import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExploreTimeline from "./pages/ExploreTimeline";
import Nav from "./components/nav/Nav";
import SpotifyLogin from "./components/login/SpotifyLogin";
import Dashboard from "./components/dashboard/Dashboard";
import SpotifyDashboard from "./components/dashboard/SpotifyDashboard";

const httpLink = createHttpLink({
	uri: "/graphql",
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

const code = new URLSearchParams(window.location.search).get("code");
localStorage.setItem("code", code);

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
							<Route exact path="/spotifylogin" component={SpotifyLogin} />
							<Route
								exact
								path="/spotifydashboard"
								component={SpotifyDashboard}
							/>
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
