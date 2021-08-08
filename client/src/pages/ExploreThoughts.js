import { React } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_THOUGHTS } from "../utils/queries";
import NewThought from "../components/thoughts/NewThought";
import ThoughtCard from "../components/thoughts/ThoughtCard";

export default function ExploreMusicThoughts() {
	const { loading, data } = useQuery(QUERY_THOUGHTS);
	const thoughts = data?.thoughts || [];
	return (
		<main>
			<div className="flex-row justify-center">
				<div
					className="col-12 col-md-10 mb-3 p-3"
					style={{ border: "1px dotted #1a1a1a" }}
				>
					<NewThought />
				</div>
				<div className="col-12 col-md-8 mb-3">
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
