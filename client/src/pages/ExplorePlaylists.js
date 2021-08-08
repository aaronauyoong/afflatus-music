import { React } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_THOUGHTS } from "../utils/queries";
import NewThought from "../components/thoughts/NewThought";
import ThoughtCard from "../components/thoughts/ThoughtCard";

export default function ExploreMusicThoughts() {
	const { loading, data } = useQuery(QUERY_THOUGHTS);
	const thoughts = data?.thoughts || [];
	console.log(thoughts);
	return (
		<main>
			<div className="thought-dashboard">
				<div>
					<NewThought />
				</div>
				<div className="thought-timeline">
					{loading ? (
						<div>Gathering thoughts...</div>
					) : (
						<ThoughtCard
							thoughts={thoughts}
							title="Music Feed. Share your Thoughts on music here!"
						/>
					)}
				</div>
			</div>
		</main>
	);
}
