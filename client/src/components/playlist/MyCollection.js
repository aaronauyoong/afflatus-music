import { React } from "react";
import SoloMusicCartoon from "../../assets/images/undrawMusicImagination.svg";

const SpotifyGetPlaylists = () => {

	return (
		<div>
			<a
				href="/spotifylogin"
				style={{ padding: "10px", margin: "10px" }}
			>
				<img src={SoloMusicCartoon} alt="Illustration of someone listening to music" />
			</a>
            <h1>MY COLLECTION</h1>
            <p>View your collection of Spotify playlists.</p>
			<p className="disclaimers">Requires authentication with Spotify.</p>
		</div>
	);
};

export default SpotifyGetPlaylists;

