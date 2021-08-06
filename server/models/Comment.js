const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
	commentContent: {
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

const Comment = model("Comment", commentSchema);

module.exports = Comment;
