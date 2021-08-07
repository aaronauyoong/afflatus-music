const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		users: async () => {
			return await User.find({});
		},
		user: async (_, args) => {
			return await User.findById(args.id);
		},
		posts: async () => {
			return await Post.find({});
		},
		post: async (_, args) => {
			return await Post.findById(args.id);
		},
	},
	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		// addPost: async (_, { products }, context) => {
		//   console.log(context);
		//   if (context.user) {
		//     const order = new Order({ products });

		//     await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

		//     return order;
		//   }

		//   throw new AuthenticationError('Not logged in');
		// },
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
