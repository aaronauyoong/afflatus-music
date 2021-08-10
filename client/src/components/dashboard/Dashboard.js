import { React } from "react";
import "../../assets/styles/customStyles.css";
import { Container } from "react-bootstrap"
import SpotifyDashboard from "./SpotifyDashboard";
import ExplorePlaylists from "../playlist/ExplorePlaylists";

export default function Dashboard() {
	
	return (
		<div>
			<main className="dashboard-home">
				<div className="welcome-user d-flex flex-column py-2">
					<h1 id="welcome-user"><placeholder>Good day!</placeholder></h1>
				</div>
				<div
					className="dashboard-menu d-flex flex-row align-items-center py-2"
					style={{ flexGrow: 1 }}
				>
					<Container className="card spotify-dashboard my-playlists">
						<SpotifyDashboard />
					</Container>
                    <Container className="card my-playlists">
						<ExplorePlaylists/>
					</Container>
				</div>
			</main>
		</div>
	);
}
