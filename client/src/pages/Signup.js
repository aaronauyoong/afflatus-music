import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [addUser] = useMutation(ADD_USER);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const mutationResponse = await addUser({
			variables: {
				email: formState.email,
				password: formState.password,
				userName: formState.userName,
				firstName: formState.firstName,
				lastName: formState.lastName,
			},
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	return (
		<div>
			<Link to="/login" className="btn btn-outline-secondary login-btn-link">
				← Go to Login
			</Link>
			<div className="signup-page-container">
				<div className="signup">
					<h2>Signup</h2>
					<form onSubmit={handleFormSubmit}>
						<div className="signup-form space-between my-2">
							<div className="signup-label">
								<label htmlFor="userName">Username</label>
							</div>
							<div className="signup-input">
								<input
									placeholder="User Name"
									name="userName"
									type="userName"
									id="userName"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="signup-form space-between my-2">
							<div className="signup-label">
								<label htmlFor="firstName">First Name</label>
							</div>
							<div className="signup-input">
								<input
									placeholder="First Name"
									name="firstName"
									type="firstName"
									id="firstName"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="signup-form space-between my-2">
							<div className="signup-label">
								<label htmlFor="lastName">Last Name</label>
							</div>
							<div className="signup-input">
								<input
									placeholder="Last Name"
									name="lastName"
									type="lastName"
									id="lastName"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="signup-form space-between my-2">
							<div className="signup-label">
								<label htmlFor="email">Email</label>
							</div>
							<div className="signup-input">
								<input
									placeholder="youremail@test.com"
									name="email"
									type="email"
									id="email"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="signup-form space-between my-2">
							<div className="signup-label">
								<label htmlFor="pwd">Password</label>
							</div>
							<div className="signup-input">
								<input
									placeholder="******"
									name="password"
									type="password"
									id="pwd"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="flex-row flex-end">
							<button type="submit" className="btn btn-light">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
