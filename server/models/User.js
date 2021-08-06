// Might no longer need this as will try to link blog posts to Spotify account
// Updated model as per Spotify's API

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Post = require('./Post');


const userSchema = new Schema({
	username: {
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
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
	},
	posts: [Post.schema]

});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
