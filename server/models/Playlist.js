// Might no longer need this as Playlist data will be extracted from Spotify API. 
// Update - will still be storing some data extracted from Spotify's API on MongoDB
// 3 Aug 2021 - Removed Playlist Description (playlistDesc) and createdAt

const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
	playlistName: {
		type: String,
		required: true,
	},
	user: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	post: [
		{
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	],
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
