// Might no longer need this as will try to link blog posts to Spotify account
// Updated model as per Spotify's API

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
    email: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	}
});

const User = model("User", userSchema);

module.exports = User;
