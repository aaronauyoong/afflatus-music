const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Thought {
		_id: ID
		thoughtContent: String
		thoughtAuthor: String
		createdAt: String
		comments: [Comment]!
	}

	type Comment {
		_id: ID
		commentText: String
		commentAuthor: String
		createdAt: String
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
		thoughts(username: String): [Thought]
		thought(thoughtId: ID!): Thought
	}

	type Mutation {
		addUser(
			userName: String!
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): Auth
		addThought(thoughtText: String!, thoughtAuthor: String!): Thought
		addComment(
			thoughtId: ID!
			commentText: String!
			commentAuthor: String!
		): Thought
		removeThought(thoughtId: ID!): Thought
		removeComment(thoughtId: ID!, commentId: ID!): Thought
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
