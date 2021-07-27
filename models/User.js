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
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = model("User", userSchema);

module.exports = User;
