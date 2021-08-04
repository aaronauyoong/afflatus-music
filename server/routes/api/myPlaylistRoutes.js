
const router = require("express").Router();
const MY_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists"
const SINGLE_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists/${playlist_id}`
const USER_PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/users/${user_id}/playlists`

// get all playlists
router.get("/myplaylists", (_, res) => {
    console.log("Attempting to retrieve all of my playlists.")
})

// get a single playlist
router.get("/myplaylists/:playlistId", (req, res) => {
    console.log("Attempting to retrieve a single playlist.")
})


