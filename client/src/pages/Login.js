import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error }] = useMutation(LOGIN);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await login({
				variables: { email: formState.email, password: formState.password },
			});
			const token = mutationResponse.data.login.token;
			Auth.login(token);
		} catch (err) {
			console.log(err);
		}
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
			<Link to="/signup" className="btn btn-outline-secondary signup-btn-link">
				← Go to Signup
			</Link>
			<div className="login-page-container">
				<div className="login">
					<h2>Login</h2>
					<form onSubmit={handleFormSubmit}>
						<div className="login-form space-between my-2">
							<div className="login-label">
								<label htmlFor="email">Email address </label>
							</div>
							<div className="login-input">
								<input
									placeholder="youremail@test.com"
									name="email"
									type="email"
									id="email"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="login-form space-between my-2">
							<div className="login-label">
								<label htmlFor="pwd">Password</label>
							</div>
							<div className="login-input">
								<input
								placeholder="******"
								name="password"
								type="password"
								id="pwd"
								onChange={handleChange}
							/>
							</div>
							
						</div>
						{error ? (
							<div>
								<p className="error-text">
									The provided credentials are incorrect.
								</p>
							</div>
						) : null}
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

export default Login;
