import { React } from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_THOUGHTS } from "../utils/queries";
import NewThought from "../components/thoughts/NewThought";
import ThoughtCard from "../components/thoughts/ThoughtCard";

export default function ExploreTimeline() {
	const { loading, data } = useQuery(QUERY_THOUGHTS);
	const thoughts = data?.thoughts || [];
	return (
		<main>
			<div className="thoughts-dashboard">
				<div>
					<NewThought />
				</div>
				<div className="thoughts-timeline">
					{loading ? (
						<div>Gathering thoughts...</div>
					) : (
						<ThoughtCard
							thoughts={thoughts}
							className="timeline"
						/>
					)}
				</div>
			</div>
		</main>
	);
}
