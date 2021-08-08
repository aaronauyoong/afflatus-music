import React from "react";
import GroupMusicCartoon from "../../assets/images/undrawComposeMusicGroup.svg";

export default function ExplorePlaylists(){

	return (
		<div>
			<a
				href="/exploretimeline"
				style={{ padding: "10px", margin: "10px" }}
			>
				<img src={GroupMusicCartoon} alt="Illustration of a group of people and music notes" />
			</a>
            <h1>EXPLORE PLAYLISTS</h1>
            <p>Browse playlists specially curated by other music lovers.</p>
			<p className="disclaimers">Requires an account with us.</p>
		</div>
	);
};