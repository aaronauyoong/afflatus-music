const { User, Post, Playlist } = require("../models");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
	Query: {
		posts: async () => {
			// Get and return all documents from the classes collection
			return await Post.find({});
		},
		users: async () => {
			return await User.find({}).populate("professor");
		},
		playlists: async () => {
			return await Playlist.find({}).populate("professor");
		},
	},
};

module.exports = resolvers;
