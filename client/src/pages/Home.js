import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/footer/Footer";
import "../assets/styles/customStyles.css";
import MusicCartoon from "../assets/images/undrawMusicCartoon.svg";


export const getTokenFromUrl = () => {
	return window.location.hash
		.substring(1)
		.split("&")
		.reduce((initial, item) => {
			let parts = item.split("=");
			initial[parts[0]] = decodeURIComponent(parts[1]);
			return initial;
		}, {});
};

export default function Home() {
	return (
		<div>
			<div className="home-page">
				<div className="home-image">
					<img
						src={MusicCartoon}
						alt="This is a cartoon of a bird listening to music."
					/>
				</div>
                <Container>
                    Welcome to Afflatus Music.
                </Container>
				<Container className="login-button">
					Login
				</Container>
                <Container className="signup-button">
                    Sign Up
                </Container>
			</div>
			<Footer />
		</div>
	);
}
