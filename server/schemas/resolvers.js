const { User, Post } = require("../models");

// Create the functions that fulfill the queries defined in `typeDefs.js`
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
        addPost: async (_, { postTitle, postContent, createdAt }) => {
            // Create and return the new School object
            return await Post.create({ postTitle, postContent, createdAt });
        },
		updateUser: async (_, args, context) => {
			if (context.user) {
				return await User.findByIdAndUpdate(context.user._id, args, {
					new: true,
				});
			}
			throw new AuthenticationError("Not logged in");
		},
		login: async (_, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("Incorrect credentials 1");
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials 2");
			}
			const token = signToken(user);
			return { token, user };
		},
	},
};

module.exports = resolvers;