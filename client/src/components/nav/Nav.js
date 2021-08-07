import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "../../assets/styles/customStyles.css";

function Nav() {

	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ul className="flex-row">
					<li className="mx-1">
						{/* this is not using the Link component to logout or user and then refresh the application to the start */}
						<a href="/" onClick={() => Auth.logout()}>
							Logout
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<ul className="flex-row">
					<li className="mx-1">
						<Link to="/signup">Signup</Link>
					</li>
					<li className="mx-1">
						<Link to="/login">Login</Link>
					</li>
				</ul>
			);
		}
	}

	return (
		<div>
			<header>
				<h1 className="nav-bar">
					<Link to="/" className="afflatus-title">
						Afflatus Music ©
					</Link>
				</h1>
			</header>

			<nav>{showNavigation()}</nav>
		</div>
	);
}

export default Nav;
