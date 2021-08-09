import { gql } from "@apollo/client";

export const QUERY_THOUGHTS = gql`
	query getThoughts {
		thoughts {
			_id
			thoughtContent
			thoughtAuthor
			createdAt
		}
	}
`;

export const QUERY_SINGLE_THOUGHT = gql`
	query getSingleThought($thoughtId: ID!) {
		thought(thoughtId: $thoughtId) {
			_id
			thoughtContent
			thoughtAuthor
			createdAt
		}
	}
`;

export const QUERY_USER = gql`
	query user($userName: String!) {
		user(username: $userName) {
			_id
			userName
			firstName
			lastName
			email
		}
	}
`;
