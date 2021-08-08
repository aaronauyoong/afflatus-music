import { React, useState, useEffect } from "react";
import useAuth from "../../utils/useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../searchResults/TrackSearchResult";
import Player from "../musicPlayer/Player";
// import GetMyPlaylists from "../../getMyData";
import "../../assets/styles/customStyles.css";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

export default function SpotifyDashboard({ code }) {

	const authToken = window.localStorage.getItem("code");
	const accessToken = useAuth(authToken);
	console.log("This is the accessToken ----->", accessToken);

	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearch("");
	}

	useEffect(() => {
		if (!accessToken) return;
		console.log("setting access token", accessToken)
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;

		// Cancelling request for each change/update of access token.
		let cancel = false;
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map((track) => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image;
							return smallest;
						},
						track.album.images[0]
					);
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: smallestAlbumImage.url,
					};
				})
			);
		});
		return () => (cancel = true);
	}, [search, accessToken]);

	function getMyData() {
		(async () => {
			const me = await spotifyApi.getMe();
			console.log(me.body);
			console.log(me.body.display_name)
			getUserPlaylists(me.body.id);
		})().catch(err => {
			console.error(err)
		})
	}

	// get my playlists
    async function getUserPlaylists(userName) {
		// console.log("dashboard: ", accessToken);
        const data = await spotifyApi.getUserPlaylists(userName);

        console.log("----------+++++++++");
        // let playlists = [];

        for(let playlist of data.body.items) {
            console.log(playlist.name + " " + playlist.id)

            // let tracks = await getPlaylistTracks(playlist.id, playlist.name);
            // console.log(tracks)
        }
    }

    // get playlist tracks 
    // async function getPlaylistTracks(playlistId, playlistName) {
    //     const data = await spotifyApi.getPlaylistTracks(playlistId, {
    //         offset: 1,
    //         limit: 10, 
    //         fields: 'items'
    
    //     })

    //     // console.log("The playlist contains these tracks %j", data.body);
    //     // console.log("The playlist contains these tracks: ", data.body.items[0].track)
    //     console.log(playlistName + " contains these tracks:");

    //     let tracks = [];

    //     for (let track_obj of data.body.items) {
    //         const track = track_obj.track
    //         tracks.push(track);
    //         console.log(track.name + " : " + track.artists[0].name)
    //       }

    //     console.log("----------+++++++++++")
    //     return tracks
    // }

	function getDisplayName() {
		(async () => {
			const user = await spotifyApi.getMe();
			const userDisplayName = user.body.display_name;
			const username = `<h1>Welcome, ${userDisplayName}.</h1>`;
			document.getElementById("welcome-user").innerHTML = username;
		})().catch(err => {
			console.error(err)
		})
	}

	getDisplayName();
	
	return (
		<div>
			<Container className="d-flex flex-column py-2">
				<Form.Control
					type="search"
					placeholder="Search Songs/Artists"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
					{searchResults.map((track) => (
						<TrackSearchResult
							track={track}
							key={track.uri}
							chooseTrack={chooseTrack}
						/>
					))}
				</div>
			</Container>
			<main className="dashboard-home">
				<div className="welcome-user d-flex flex-column py-2">
					<h1 id="welcome-user"><placeholder>Welcome.</placeholder></h1>
				</div>
				<button onClick={getMyData}>
					Get my data
				</button>
			</main>
			<div className="music-player">
				<Player accessToken={accessToken} code={code} trackUri={playingTrack?.uri} />
			</div>
		</div>
	);
}
