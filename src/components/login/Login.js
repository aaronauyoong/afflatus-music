import React from "react";
import { Container } from "react-bootstrap";
import MusicCartoon from "../../assets/images/undrawMusicCartoon.svg";
const AUTH_URL =
	"https://accounts.spotify.com/authorize?client_id=2ae77a009ef04f15b6de9046ff925ebb&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

// Note: may need to add more scopes for playlist functionality.
// For now, only adding basic functionality.

export default function Login() {
	return (
		<div>
			<img src={MusicCartoon} alt="This is a cartoon of a bird listening to music."/>
			<Container
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "100vh" }}
			>
				<a className="btn btn-success btn-lg" href={AUTH_URL}>
					{" "}
					Login with Spotify{" "}
				</a>
			</Container>
		</div>
	);
}
