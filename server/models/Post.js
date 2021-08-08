const mongoose = require("mongoose");

const { Schema } = mongoose;

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
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
	user: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
