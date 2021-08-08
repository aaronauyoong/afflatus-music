import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser(
    $userName: String!
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
	) {
		addUser(
      userName: $userName
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
		) {
			token
			user {
				_id
			}
		}
	}
`;

// export const ADD_THOUGHT = gql`
//   mutation addPost($postTitle: String!, $postContent: String!, $createdAt: String!, $user: String!) {
//     addPost(postTitle: $postTitle, postContent: $postContent, createdAt: $createdAt, user: $user ) {
//       _id
//       postTitle
//       postContent
//       createdAt
//       user {
//         firstName
//         lastName
//       }
//   }
// `;
