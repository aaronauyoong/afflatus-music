import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";
import Auth from "../../utils/auth";

const PostForm = () => {
	const [postTitle, setPostTitle] = useState("");
	const [postContent, setPostContent] = useState("");

	const [characterCount, setCharacterCount] = useState(0);

	const [addPost, { error }] = useMutation(ADD_POST, {
		update(cache, { data: { addPost } }) {
			try {
				const { posts } = cache.readQuery({ query: QUERY_POSTS });

				cache.writeQuery({
					query: QUERY_POSTS,
					data: { posts: [addPost, ...posts] },
				});
			} catch (e) {
				console.error(e);
			}
		},
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addPost({
				variables: {
					postTitle,
					postContent,
					user: Auth.getProfile().data.firstName,
				},
			});

			setPostTitle("");
			setPostContent("");
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "postTitle") {
			setPostTitle(value);
			setPostContent(value);
			setCharacterCount(value.length);
		}
	};

	return (
		<div>
			<h3>What's on your techy mind?</h3>

			{Auth.loggedIn() ? (
				<>
					<p
						className={`m-0 ${
							characterCount === 280 || error ? "text-danger" : ""
						}`}
					>
						Character Count: {characterCount}/280
					</p>
					<form
						className="flex-row justify-center justify-space-between-md align-center"
						onSubmit={handleFormSubmit}
					>
						<div className="col-12 col-lg-9">
							<textarea
								name="postTitle"
								placeholder="Write your post title here..."
								value={postTitle}
								className="form-input w-100"
								style={{ lineHeight: "1.5", resize: "vertical" }}
								onChange={handleChange}
							></textarea>
						</div>

						<div className="col-12 col-lg-9">
							<textarea
								name="postContent"
								placeholder="Write your post content here..."
								value={postContent}
								className="form-input w-100"
								style={{ lineHeight: "1.5", resize: "vertical" }}
								onChange={handleChange}
							></textarea>
						</div>

						<div className="col-12 col-lg-3">
							<button className="btn btn-primary btn-block py-3" type="submit">
								Add Post
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
					You need to be logged in to share your posts and playlists. Please{" "}
					<Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
				</p>
			)}
		</div>
	);
};

export default PostForm;
