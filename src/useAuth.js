import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	useEffect(() => {
		axios
			.post("http://localhost:3001/login", {
				code,
			})
			.then((res) => {
				console.log(res.data);
				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
				// below removes extra code section from URL that we dont want (includes clientID, scopes for Spotify etc)
				window.history.pushState({}, null, "/");
			})
			.catch(() => {
				window.location = "/";
			});
	}, [code]);

	// whenever refresh token changes/expires, run the below useEffect()
	useEffect(() => {
		// prevent auto refresh as script below causes refresh token to be ran before acquiring one, returning as undefined and causing errors.
		const interval = setInterval(() => {
			if (!refreshToken || !expiresIn) return;
			axios
				.post("http://localhost:3001/refresh", {
					refreshToken,
				})
				.then((res) => {
					console.log(res.data);
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
					// below removes extra code section from URL that we dont want (includes clientID, scopes for Spotify etc)
					window.history.pushState({}, null, "/");
				})
				.catch(() => {
					window.location = "/";
				});
                // 1 minute before expires, will update refreshToken
		}, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);


	return accessToken;
}
