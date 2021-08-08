const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate("thoughts");
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate("thoughts");
		},
		thoughts: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Thought.find(params).sort({ createdAt: -1 });
		},
		thought: async (parent, { thoughtId }) => {
			return Thought.findOne({ _id: thoughtId });
		},
	},
	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		addThought: async (_, { thoughtText, thoughtAuthor }) => {
			const thought = await Thought.create({ thoughtText, thoughtAuthor });

			await User.findOneAndUpdate(
				{ username: thoughtAuthor },
				{ $addToSet: { thoughts: thought._id } }
			);

			return thought;
		},
		removeThought: async (parent, { thoughtId }) => {
			return Thought.findOneAndDelete({ _id: thoughtId });
		},
		addComment: async (_, { thoughtId, commentText, commentAuthor }) => {
			return Thought.findOneAndUpdate(
				{ _id: thoughtId },
				{
					$addToSet: { comments: { commentText, commentAuthor } },
				},
				{
					new: true,
					runValidators: true,
				}
			);
		},
		removeComment: async (parent, { thoughtId, commentId }) => {
			return Thought.findOneAndUpdate(
				{ _id: thoughtId },
				{ $pull: { comments: { _id: commentId } } },
				{ new: true }
			);
		},
		login: async (_, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
