import { React, useState, useEffect } from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./pages/Home";
// import Login from "./components/login/Login";
// import Profile from "./components/footer/Profile";
import { StoreProvider } from "./utils/GlobalState";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SpotifyLogin from "./components/login/SpotifyLogin";
import { getTokenFromUrl } from "./components/login/SpotifyLogin";
import SpotifyDashboard from "./components/dashboard/SpotifyDashboard";
import UserPlaylists from "./components/playlist/GetUserPlaylists";

const client = new ApolloClient({
	uri: "https://localhost:3000",
	cache: new InMemoryCache(),
});

// Refresh page brings back to login page - need fix

// getting URL param called 'code'
const code = new URLSearchParams(window.location.search).get("code");
// const authCode = window.localStorage.setItem("code", code);
// const authCode = window.localStorage.getItem("code");


function App() {

	const [token, setToken] = useState();

	useEffect(() => {
		const hash = getTokenFromUrl();
		window.location.hash = "";
		const _token = hash.access_token;

		if (_token) {
			setToken(_token);
		}

		console.log("this is the token", token);
	}, [token]);

	return (
		<ApolloProvider client={client}>
			<StoreProvider>
				<div className="afflatus-music">
					<Nav />
					<main>
						<Router>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/login" component={Login} />
								<Route exact path ="/signup" component={Signup} />
								<Route exact path="/myplaylists" component={SpotifyDashboard} code={code}>
									{code ? <SpotifyDashboard authCode={code} /> : <SpotifyLogin />}
								</Route>
								{/* <Route exact path="/exploreplaylists" component={ExplorePlaylists}>
								</Route> */}
								{/* <Route exact path="/myplaylists" component={UserPlaylists}code={code}>
									{code ? <UserPlaylists authCode={code} /> : <Login />}
								</Route> */}
								{/* <Route
									exact
									path="/myplaylists"
									component={UserPlaylists}
									code={code}
								>
									{code ? <UserPlaylists code={authCode} /> : <Login />}
								</Route> */}
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
