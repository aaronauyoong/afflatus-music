import { React, useEffect } from "react";
import useAuth from "./utils/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
// import GetMyData from "../../getMe"
// import "../../assets/styles/customStyles.css";
// import { urlCode } from "../../utils/urlCode.js";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

export default function getMyPlaylists({ code }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const accessToken = useAuth(code);

    // eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

    // get my data
	function getMyData() {
		(async () => {
			const me = await spotifyApi.getMe();
			getUserPlaylists(me.body.id);
		})().catch(err => {
			console.error(err)
		})
	}

    // get my playlists
    async function getUserPlaylists(userName) {
        const data = await spotifyApi.getUserPlaylists(userName);

        console.log("----------+++++++++");
        // let playlists = [];

        for(let playlist of data.body.items) {
            console.log(playlist.name + " " + playlist.id)

            let tracks = await getPlaylistTracks(playlist.id, playlist.name);
            console.log(tracks)
        }
    }

    // get playlist tracks 
    async function getPlaylistTracks(playlistId, playlistName) {
        const data = await spotifyApi.getPlaylistTracks(playlistId, {
            offset: 1,
            limit: 100, 
            fields: 'items'
    
        })

        // console.log("The playlist contains these tracks %j", data.body);
        // console.log("The playlist contains these tracks: ", data.body.items[0].track)
        console.log("'" + playlistName + "'" + " contains these tracks:");

        let tracks = [];

        for (let track_obj of data.body.items) {
            const track = track_obj.track
            tracks.push(track);
            console.log(track.name + " : " + track.artists[0].name)
          }

        console.log("----------+++++++++++")
        return tracks
    }

    getMyData();

	
	return (
		<div>
            <button onClick={getMyData}>Get My Data</button>
            <button onClick={getUserPlaylists}>Get User Playlists</button>
            <button onClick={getPlaylistTracks}>Get Playlist Tracks</button>
		</div>
	);
}
