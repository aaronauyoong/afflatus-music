import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import "../../assets/styles/customStyles.css";

const ThoughtForm = () => {
	const [thoughtContent, setThoughtContent] = useState("");

	const [characterCount, setCharacterCount] = useState(0);

	const [addThought, { error }] = useMutation(ADD_THOUGHT, {
		update(cache, { data: { addThought } }) {
			try {
				const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

				cache.writeQuery({
					query: QUERY_THOUGHTS,
					data: { thoughts: [addThought, ...thoughts] },
				});
			} catch (error) {
				console.error(error);
			}
		},
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addThought({
				variables: {
					thoughtContent,
					thoughtAuthor: Auth.getProfile().data.username,
				},
			});

			setThoughtContent("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "thoughtContent" && value.length <= 500) {
			setThoughtContent(value);
			setCharacterCount(value.length);
		}
	};

	return (
		<div className="user-thoughts">
			<header className="user-thought-title">
				<h3>Share your playlists and music recommendations here <i class="fas fa-music"></i> </h3>
			</header>
			<div className="user-thoughts">
				{Auth.loggedIn() ? (
					<div>
						<form onSubmit={handleFormSubmit}>
							<div>
								<textarea
									name="thoughtContent"
									placeholder="What's happening?"
									value={thoughtContent}
									className="form-input"
									style={{ lineHeight: "1.5", resize: "vertical" }}
									onChange={handleChange}
								></textarea>
							</div>

							<div className="thoughts-form-footer">
								<div className="character-count">
									<p
										className={`${
											characterCount === 500 || error ? "text-danger" : ""
										}`}
									>
										Character Count: {characterCount}/500
									</p>
								</div>

								<div className="share-thoughts">
									<button
										className="btn btn-primary btn-block py-3 share-btn"
										type="submit"
									>
										Share {" "} <i class="fas fa-share"></i>
									</button>
								</div>
							</div>

							{error && <div>{error.message}</div>}
						</form>
					</div>
				) : (
					<p className="login-signup-message">
						You need to be logged in to share your music and playlists. Please{" "}
						<Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default ThoughtForm;
