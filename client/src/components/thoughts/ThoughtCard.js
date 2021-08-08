import React from "react";
import { Link } from "react-router-dom";

const ThoughtList = ({ thoughts, title }) => {
	if (!thoughts.length) {
		return (
			<div className="no-thoughts">
				<header>
					<h3>
						No music thoughts nor playlists have been shared yet. Be the first
						to share your thoughts!
					</h3>
				</header>
			</div>
		);
	}

	return (
		<div>
			<h3>{title}</h3>
			{thoughts &&
				thoughts.map((thought) => (
					<div key={thought._id} className="card mb-3">
						<h4 className="card-header bg-primary text-light p-2 m-0">
							{thought.thoughtAuthor} <br />
							<span style={{ fontSize: "1rem" }}>
								had this thought on {thought.createdAt}
							</span>
						</h4>
						<div className="card-body bg-light p-2">
							<p>{thought.thoughtContent}</p>
						</div>
						<Link
							className="btn btn-primary btn-block btn-squared"
							to={`/thoughts/${thought._id}`}
						>
							Ponder more about this Thought.
						</Link>
					</div>
				))}
		</div>
	);
};

export default ThoughtList;
