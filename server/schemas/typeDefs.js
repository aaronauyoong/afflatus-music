const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Post {
		id: ID
		postTitle: String
        postContent: String
		createdAt: String
		user: [User]
	}

	type User {
	    id: ID
        username: String
        displayName: String
	}

    type Playlist {
        id: ID
        playlistName: String
    }
`;

module.exports = typeDefs;
