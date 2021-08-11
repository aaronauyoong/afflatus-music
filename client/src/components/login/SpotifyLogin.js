import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import "../../assets/styles/customStyles.css";
import MusicCartoon from "../../assets/images/undrawMusicCartoon.svg";

const scopes =
	"streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-modify-public%20playlist-modify-private";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&scope=${scopes}`;

export default function SpotifyLogin() {
	return (
		<div>
			<div className="spotify-login-page">
				<div className="spotify-login-image">
					<img
						src={MusicCartoon}
						alt="This is a cartoon of a bird listening to music."
					/>
				</div>
				<Container className="spotify-login-button">
					<a className="btn btn-success btn-lg" href={AUTH_URL}>
						Login with Spotify
					</a>
				</Container>
			</div>
			<Footer />
		</div>
	);
}
