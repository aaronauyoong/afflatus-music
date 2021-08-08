const mongoose = require("mongoose");

const { Schema } = mongoose;

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

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
