const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Post {
		_id: ID
		postTitle: String
		postContent: String
		createdAt: String
		username: [User]
	}
	type User {
		_id: ID
		username: String
		firstName: String
		lastName: String
		email: String
	}
	type Auth {
		token: ID
		user: User
	}
	type Query {
		getUsers: [User]
		getPosts: [Post]
	}
	type Mutation {
		addUser(
			username: String!
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): Auth
		updateUser(
			username: String!
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): User
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
