import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
	query allPosts {
		post {
			_id
			postTitle
			postContent
			createdAt
			user {
                username
                firstName
                lastName
            }
		}
	}
`;

export const QUERY_USER = gql`
	{
		user {
			username
			firstName
			lastName
			email 
			}
		}
	}
`;
