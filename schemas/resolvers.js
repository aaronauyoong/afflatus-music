const { AuthenticationError } = require("apollo-server-express");
const { User, Thought } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate("thoughts");
		},
		user: async (_, { username }) => {
			return User.findOne({ username }).populate("thoughts");
		},
		thoughts: async (_, { username }) => {
			const params = username ? { username } : {};
			return Thought.find(params).sort({ createdAt: -1 });
		},
		thought: async (_, { thoughtId }) => {
			return Thought.findOne({ _id: thoughtId });
		},
	},
	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		addThought: async (_, { thoughtContent, thoughtAuthor }) => {
			const thought = await Thought.create({ thoughtContent, thoughtAuthor });

			await User.findOneAndUpdate(
				{ username: thoughtAuthor },
				{ $addToSet: { thoughts: thought._id } }
			);

			return thought;
		},
		removeThought: async (_, { thoughtId }) => {
			return Thought.findOneAndDelete({ _id: thoughtId });
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
