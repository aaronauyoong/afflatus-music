import React from "react";
import { Container } from "react-bootstrap";
import "../../assets/styles/customStyles.css";
import MusicCartoon from "../../assets/images/undrawMusicCartoon.svg";

const CLIENT_ID = "2ae77a009ef04f15b6de9046ff925ebb";
const REDIRECT_URI = "http://localhost:3000";
// Note: may need to add more scopes for playlist functionality.
// For now, only adding basic functionality.
const scopes = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-modify-public";

const AUTH_URL =
	`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;


export default function Login() {
	return (
		<div className="login-page">
			<div className="login-image">
				<img
					src={MusicCartoon}
					alt="This is a cartoon of a bird listening to music."
				/>
			</div>
			<Container
				className="login-button"
			>
				<a className="btn btn-success btn-lg" href={AUTH_URL}>
					{" "}
					Login with Spotify{" "}
				</a>
			</Container>
		</div>
	);
}
