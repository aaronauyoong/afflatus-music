const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	playlistName: {
		type: String,
		required: true,
	},
    playlistDesc: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
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

const Playlist = model("Post", playlistSchema);

module.exports = Playlist;
