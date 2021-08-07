import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/footer/Footer";
import "../assets/styles/customStyles.css";
import MusicCartoon from "../assets/images/undrawMusicCartoon.svg";
import SpotifyDashboard from "../components/dashboard/SpotifyDashboard";
import ExplorePlaylists from "../components/playlist/ExplorePlaylists";

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
			</div>
			<Footer />
		</div>
	);
}
