import { React, useState, useEffect } from "react";
import MyPlaylists from "../../components/playlist/SpotifyGetPlaylist";
import ExplorePlaylists from "../../components/playlist/ExplorePlaylists";
import useAuth from "../../utils/useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../searchResults/TrackSearchResult";
import Player from "../musicPlayer/Player";
import "../../assets/styles/customStyles.css";
// import { urlCode } from "../../utils/urlCode.js";

// Image Imports
import GroupMusicCartoon from "../../assets/images/undrawComposeMusicGroup.svg";
import SoloMusicCartoon from "../../assets/images/undrawMusicImagination.svg";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

export default function Dashboard({ code }) {
	const accessToken = useAuth(code);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState();

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

		// everytime we change access token, we want to cancel request
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
					<h1>Welcome, Spotify User.</h1>
				</div>
				<div
					className="dashboard-menu d-flex flex-row align-items-center py-2"
					style={{ flexGrow: 1 }}
				>
					<div className="my-playlists">
						<MyPlaylists accessToken={accessToken} />
					</div>
					<div className="explore-playlists">
						<ExplorePlaylists accessToken={accessToken} />
					</div>
				</div>
				<div className="post-overview" style={{ flexGrow: 1 }}>
					{/* <p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p>
				<p>This is where posts will be.</p> */}
				</div>
			</main>

			<div className="music-player">
				<Player accessToken={accessToken} trackUri={playingTrack?.uri} />
			</div>
		</div>
	);
}
