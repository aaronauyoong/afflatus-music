const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
	thoughtContent: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 500,
		trim: true,
	},
	thoughtAuthor: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	}
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
