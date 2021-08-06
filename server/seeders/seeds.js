const db = require("../config/connection");
const { User, Post, Comment } = require("../models");
const userSeeds = require("./userSeeds.json")

db.once("open", async () => {
	await Comment.deleteMany();

	console.log("//----------------------------Comments seeded----------------------------//");

	await Post.deleteMany();

	const posts = await Post.insertMany([
		{
			postTitle: "Check out my playlist!",
			postContent:
				"Omg I love this album! https://open.spotify.com/album/4igVZxLMxQDV7D94RzW6cw?si=4dHBrISkQlSyQAyR4PefhA.",
			createdAt: "06/06/2021",
			username: "ronnieyoong"
		},
		{
			postTitle: "Check out this album!",
			postContent:
				"Hey guys, check out this playlist! What songs do you think should be on here? https://open.spotify.com/playlist/5OmCKHlEBTzjATHRHJiXJU?si=RlZ6WGy9QaaavJetuR8XmQ.",
			createdAt: "06/06/2021",
			username: "daniel.k.here"
		}
	]);

	console.log("//----------------------------Posts seeded----------------------------//");

	await User.deleteMany();

	await User.create(userSeeds);


	console.log("//----------------------------Users seeded----------------------------//");

	
	console.log("//----------------------------ALL DONE!----------------------------//!");
	process.exit();
});
