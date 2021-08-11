import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "../../assets/styles/customStyles.css";

function Nav() {

	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ul className="nav-links flex-row">
					<li className="mx-1">
						<a href="/" onClick={() => Auth.logout()}>
							Logout
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<div className="nav-links flex-row">
					<h6><Link to="/signup" className="nav-links mx-1">Signup</Link></h6>
					<h6><Link to="/login" className="nav-links mx-1">Login</Link></h6>
				</div>
			);
		}
	}

	return (
		<div className="nav-bar">
			<header>
				<h1 >
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
