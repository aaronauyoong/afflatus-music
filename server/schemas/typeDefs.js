const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Post {
		_id: ID
		postTitle: String
		postContent: String
		createdAt: String
		user: [User]
	}

	type User {
		_id: ID
		userName: String
		firstName: String
		lastName: String
		email: String
	}

	type Auth {
		token: ID
		user: User
	}

	type Query {
		users: [User]
		user(id: ID!): User
		post(id: ID!): Post
		posts: [Post]
	}

	type Mutation {
		addUser(
			userName: String!
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): Auth
		addPost(
			postTitle: String!
			postContent: String!
			createdAt: String!
			user: String!
		): Post
		updateUser(
			userName: String!
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): User
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
