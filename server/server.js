const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node")
const app = express();

// Configure body parsing for AJAX requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to Mongo DB

// Login API 
app.post("/login", (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebAPI ({
        redirectUri: "http://localhost:3000",
        clientId: "2ae77a009ef04f15b6de9046ff925ebb",
        clientSecret: "b2ae693ca18f4ad696d600ca55edb740"
    })

    spotifyApi.authorizationCodeGrant(code).then((data) => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.request_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        throw err
    })
})



