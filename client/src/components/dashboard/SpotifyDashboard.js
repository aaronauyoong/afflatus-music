import { React, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../searchResults/TrackSearchResult.js";
import Player from "../musicPlayer/Player";
import "../../assets/styles/customStyles.css";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

function useAuth(code) {
	const [access_token, setAccessToken] = useState();
	const [refresh_token, setRefreshToken] = useState();
	const [expires_in, setExpiresIn] = useState();

	useEffect(() => {
		axios
			.post(
				"https://accounts.spotify.com/api/token",
				new URLSearchParams({
					grant_type: "authorization_code",
					code: code,
					redirect_uri: "http://localhost:3000/spotifydashboard",
					client_id: "2ae77a009ef04f15b6de9046ff925ebb",
					client_secret: "",
				}),
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			)
			.then((res) => {
				setAccessToken(res.data.access_token);
				setRefreshToken(res.data.refresh_token);
				setExpiresIn(res.data.expires_in);
				window.history.pushState({}, null, "/");
			})
			.catch(() => {
				window.location = "/spotifylogin";
			});
	}, [code]);

	return access_token;
}

export default function SpotifyDashboard() {
	const code = localStorage.getItem("code");
	const accessToken = useAuth(code);

	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();
	const [playlists, setUserPlaylists] = useState([]);

	function chooseTrack(track) {
		setPlayingTrack(track);
		setSearch("");
	}

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		if (!search) return setSearchResults([]);
		if (!accessToken) return;

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
			console.log(me.body.display_name);
			getUserPlaylists(me.body.id);
		})().catch((err) => {
			console.error(err);
		});
	}

	async function getUserPlaylists(userName) {
		const data = await spotifyApi.getUserPlaylists(userName);
		setUserPlaylists(data.body.items);
	}

	function getDisplayName() {
		(async () => {
			const user = await spotifyApi.getMe();
			const userDisplayName = user.body.display_name;
			const username = `<h1>Welcome, ${userDisplayName}.</h1>`;
			document.getElementById("welcome-user").innerHTML = username;
		})().catch((err) => {
			console.error(err);
		});
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
				<div className="d-flex flex-column py-2 welcome-user ">
					<h1 id="welcome-user">
						<placeholder>Welcome.</placeholder>
					</h1>
				</div>
				<div className="get-data-button">
					<button className="get-my-playlists" onClick={getMyData}>
						Get My Playlists
					</button>
				</div>
				<div className="display-user-playlists">
					<div className="render-user-playlist">
						{playlists
							? playlists.map((playlist) => (
									<div className="user-playlists">
										<p>{playlist.name}</p>
									</div>
							  ))
							: ""}
					</div>
				</div>
				<div className="load-music-player">
					<Player
						accessToken={accessToken}
						code={code}
						trackUri={playingTrack?.uri}
					/>
				</div>
			</main>
		</div>
	);
}
