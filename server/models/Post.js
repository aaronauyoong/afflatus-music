const { Schema, model } = require("mongoose");

const postSchema = new Schema({
	postTitle: {
		type: String,
		required: true,
	},
    postContent: {
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
	playlist: [
		{
			type: Schema.Types.ObjectId,
			ref: "Playlist",
		},
	],
});

const Post = model("Post", postSchema);

module.exports = Post;
