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
	query user($username: String!) {
		user(username: $username) {
			_id
			username
			firstName
			lastName
			email
		}
	}
`;
