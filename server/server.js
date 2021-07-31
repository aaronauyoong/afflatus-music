const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const cors = require("cors");
require("dotenv").config();

const app = express();
// To prevent CORS errors
app.use(cors());

// Configure body parsing for AJAX requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Connection to Mongo DB

// Refresh
app.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	const spotifyApi = new SpotifyWebAPI({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		refreshToken,
	});

	// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			console.log("The access token has been refreshed!");

            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body["access_token"]);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(400);
		});
});

// Login
app.post("/login", (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebAPI({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then(data => {
			res.json({
				accessToken: data.body.access_token,
				refreshToken: data.body.request_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			res.sendStatus(400);
			console.log(err);
		});
});

// Start the API server
app.listen(PORT, () =>
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);

