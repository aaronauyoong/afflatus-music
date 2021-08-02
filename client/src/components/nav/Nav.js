import React from "react";
// import { NavbarContainer, Link, Logo, Menu, Button } from "react-bootstrap";
import "../../assets/styles/customStyles.css";
// import { useAuth } from "../../use-auth.js";

function Nav() {
	// Get auth state and re-render anytime it changes
	// const auth = useAuth();
	return (
		<div>
			<header>
				<nav className="nav-bar">
					<p className="afflatus-title">Afflatus Music ©</p>
				</nav>
			</header>

            {/* <NavbarContainer>
 			<Logo />
 			<Menu>
 				<Link to="/about">About</Link>
 				<Link to="/contact">Contact</Link>
 				{auth.user ? (
 					<div>
 						<Link to="/account">Account ({auth.user.email})</Link>
 						<Button onClick={() => auth.signout()}>Signout</Button>
 					</div>
 				) : (
 					<Link to="/signin">Signin</Link>
 				)}
 			</Menu>
 		</NavbarContainer> */}
		</div>
	);
}

export default Nav;
