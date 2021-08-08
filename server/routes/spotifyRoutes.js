const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");
// const scopes = [
// 	"ugc-image-upload",
// 	"user-read-playback-state",
// 	"user-modify-playback-state",
// 	"user-read-currently-playing",
// 	"streaming",
// 	"app-remote-control",
// 	"user-read-email",
// 	"user-read-private",
// 	"playlist-read-collaborative",
// 	"playlist-modify-public",
// 	"playlist-read-private",
// 	"playlist-modify-private",
// 	"user-library-modify",
// 	"user-library-read",
// 	"user-top-read",
// 	"user-read-playback-position",
// 	"user-read-recently-played",
// 	"user-follow-read",
// 	"user-follow-modify",
// ];

// const spotifyApi = new SpotifyWebApi({
// 	redirectUri: process.env.REDIRECT_URI,
// 	clientId: process.env.CLIENT_ID,
// 	clientSecret: process.env.CLIENT_SECRET,
// });



router.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

router.post("/spotifylogin", (req, res) => {
	const code = req.body.code;
	console.log("This is the code after posting in /login ----->", code);

	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.refresh_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			res.sendStatus(400);
		});
});

// ------------------------------------------------------------------------------------------ //

// const _getToken = async (code) => {
// 	const result = await fetch("https://accounts.spotify.com/api/token", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded",
// 			Authorization:
// 				"Authorization: Basic " + encode(CLIENT_ID + ":" + CLIENT_SECRET),
// 		},
// 		body: {
// 			grant_type: "authorization_code",
// 			code: code,
// 			redirect_uri: "exp://localhost:19000/--/",
// 		},
// 	});

// 	const data = await result.json();
// 	console.log(data);
// 	return data.access_token;
// };

// ------------------------------------------------------------------------------------------ //


// router.get("/spotifylogin", (_, res) => {
// 	return res.redirect(spotifyApi.createAuthorizeURL(scopes));
// });

// router.post("/spotifydashboard", (req, res) => {
// 	const error = req.query.error;
// 	const code = req.query.code;
// 	console.log(code)
// 	const state = req.query.state;
// 	console.log(state)

// 	if (error) {
// 		console.error("Callback Error:", error);
// 		res.send(`Callback Error: ${error}`);
// 		return;
// 	}

// 	spotifyApi
// 		.authorizationCodeGrant(code)
// 		.then((data) => {
// 			const access_token = data.body["access_token"];
// 			console.log(
// 				"This is the access_token in spotifyRoutes.js----->",
// 				access_token
// 			);
// 			const refresh_token = data.body["refresh_token"];
// 			const expires_in = data.body["expires_in"];

// 			spotifyApi.setAccessToken(access_token);
// 			spotifyApi.setRefreshToken(refresh_token);

// 			console.log("access_token:", access_token);
// 			console.log("refresh_token:", refresh_token);

// 			console.log(
// 				`Sucessfully retreived access token. Expires in ${expires_in} s.`
// 			);
// 			res.send("Success! You can now close the window.");

// 			setInterval(async () => {
// 				const data = await spotifyApi.refreshAccessToken();
// 				const access_token = data.body["access_token"];

// 				console.log("The access token has been refreshed!");
// 				console.log("access_token:", access_token);
// 				spotifyApi.setAccessToken(access_token);
// 			}, (expires_in / 2) * 1000);
// 		})
// 		.catch((error) => {
// 			console.error("Error getting Tokens:", error);
// 			res.send(`Error getting Tokens: ${error}`);
// 		});
// });

module.exports = router;
