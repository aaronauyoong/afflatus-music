import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS } from "../../utils/queries";
import Auth from "../../utils/auth";

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
		<div>
			<header>
				<h3>Share your playlists and music recommendations here.</h3>
			</header>

			{Auth.loggedIn() ? (
				<>
					<p
						className={`m-0 ${
							characterCount === 500 || error ? "text-danger" : ""
						}`}
					>
						Character Count: {characterCount}/500
					</p>
					<form
						className="flex-row justify-center justify-space-between-md align-center"
						onSubmit={handleFormSubmit}
					>
						<div className="col-12 col-lg-9">
							<textarea
								name="thoughtContent"
								placeholder="Share your current thuoghts and recommendations on music here."
								value={thoughtContent}
								className="form-input w-100"
								style={{ lineHeight: "1.5", resize: "vertical" }}
								onChange={handleChange}
							></textarea>
						</div>

						<div className="col-12 col-lg-3">
							<button className="btn btn-primary btn-block py-3" type="submit">
								Add Thought
							</button>
						</div>
						{error && (
							<div className="col-12 my-3 bg-danger text-white p-3">
								{error.message}
							</div>
						)}
					</form>
				</>
			) : (
				<p>
					You need to be logged in to share your music and playlists. Please{" "}
					<Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
				</p>
			)}
		</div>
	);
};

export default ThoughtForm;
