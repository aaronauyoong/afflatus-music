import { React, useEffect } from "react";
import useAuth from "./utils/useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

export default function GetMyPlaylists({ code }) {
    // console.log("Code", code);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const accessToken = useAuth(code);

    // eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
        // console.log("This is the access token", accessToken); 
		if (!accessToken) return;
        
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

    // get my data
    // try to call this one to prevent too many fetch calls, store getMe() in a global state.
    // then can try to extract display_name and username and populate in MongoDB for users to write posts.
	function getMyData() {
		(async () => {
			const me = await spotifyApi.getMe();
            // console.log("get user playlists")
			await getUserPlaylists(me.body.id);
		})().catch(err => {
			console.error(err)
		})
	}

    // get my playlists
    async function getUserPlaylists(accessToken) {
        // console.log("this is my username", userName);
        console.log("ACCESS TOKEN", accessToken);
        const me = await spotifyApi.getMe();
        const data = await spotifyApi.getUserPlaylists(me.body.id);

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
        console.log(playlistName + " contains these tracks:");

        let tracks = [];

        for (let track_obj of data.body.items) {
            const track = track_obj.track
            tracks.push(track);
            console.log(track.name + " : " + track.artists[0].name)
          }

        console.log("----------+++++++++++")
        return tracks
    }

    //getMyData();

	
	return (
		<div>
            <button onClick={getMyData}>Get My Data</button>
            <button onClick={getUserPlaylists}>Get User Playlists</button>
            <button onClick={getPlaylistTracks}>Get Playlist Tracks</button>
		</div>
	);
}
