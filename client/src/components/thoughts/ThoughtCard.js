import React from "react";

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
			<div>
				{thoughts &&
					thoughts.map((thought) => (
						<div key={thought._id} className="card thought-card">
							<div className="card-header thought-header">
								<header>
									<h4>{thought.thoughtAuthor} </h4>
								</header>
								<div className="thought-date">
									<p>{thought.createdAt}</p>
								</div>
							</div>

							<div className="card-body thought-body">
								<p>{thought.thoughtContent}</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default ThoughtList;
