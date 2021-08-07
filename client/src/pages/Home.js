import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/footer/Footer";
import "../assets/styles/customStyles.css";
import MusicCartoon from "../assets/images/undrawMusicCartoon.svg";
import SpotifyDashboard from "../components/dashboard/SpotifyDashboard";
import ExplorePlaylists from "../components/playlist/ExplorePlaylists";


// export const getTokenFromUrl = () => {
// 	return window.location.hash
// 		.substring(1)
// 		.split("&")
// 		.reduce((initial, item) => {
// 			let parts = item.split("=");
// 			initial[parts[0]] = decodeURIComponent(parts[1]);
// 			return initial;
// 		}, {});
// };

export default function Home() {
	return (
		<div>
			<div className="home-page">
				<Container className="welcome-message">
                    <h1>Welcome to Afflatus Music.</h1>
					<p>A haven for music lovers to share their curated Spotify playlists.</p>
                </Container>
				<div
					className="dashboard-menu d-flex flex-row align-items-center py-2"
					style={{ flexGrow: 1 }}
				>
					<div className="spotify-dashboard my-playlists">
						<SpotifyDashboard />
					</div>
                    <div className="my-playlists">
						<ExplorePlaylists/>
					</div>
				</div>
				<div className="home-image">
					<img
						src={MusicCartoon}
						alt="This is a cartoon of a bird listening to music."
					/>
				</div>
                
				<Container className="home-buttons">
					<a href="/login" className="btn btn-success btn-lg login-btn">Login</a>
					<a href="/signup" className="btn btn-success btn-lg signup-btn">Signup</a>
				</Container>
			</div>
			<Footer />
		</div>
	);
}
