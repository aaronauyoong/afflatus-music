import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
	query allPosts {
		post {
			_id
			postTitle
			postContent
			createdAt
			user {
				userName
                firstName
                lastName
            }
		}
	}
`;

export const QUERY_USER = gql`
	{
		user {
			userName
			firstName
			lastName
			email 
			}
		}
	}
`;
