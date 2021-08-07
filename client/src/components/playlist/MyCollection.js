import { React } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// Image Imports
import SoloMusicCartoon from "../../assets/images/undrawMusicImagination.svg";

const spotifyApi = new SpotifyWebApi({
	clientId: "2ae77a009ef04f15b6de9046ff925ebb",
});

const SpotifyGetPlaylists = () => {

	return (
		<div>
			<a
				href="/spotifylogin"
				// onClick={handleGetPlaylists}
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

