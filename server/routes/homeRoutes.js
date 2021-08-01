const router = require("express").Router();
const SpotifyWebAPI = require("spotify-web-api-node");

// Login
router.post("/login", (req, res) => {
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

// Refresh
router.post("/refresh", (req, res) => {
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


module.exports = router;
