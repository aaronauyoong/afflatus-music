const db = require("../config/connection");
const { User, Thought } = require("../models");
const userSeeds = require("./userSeeds.json");
const thoughtSeeds = require("./thoughtSeeds.json");

db.once("open", async () => {
	try {
		// await Comment.deleteMany({});
		// // Comment seeds to be inserted.

		// console.log(
		// 	"//----------------------------Comments seeded----------------------------//"
		// );

		await Thought.deleteMany({});
		console.log("Old test post (thought) data deleted.")
		await Thought.insertMany(thoughtSeeds);

		console.log(
			"//----------------------------Posts seeded----------------------------//"
		);

		await User.deleteMany({});
		console.log("Old test user data deleted.")
		await User.create(userSeeds);

		console.log(
			"//----------------------------Users seeded----------------------------//"
		);

		console.log(
			"//----------------------------ALL DONE!----------------------------//!"
		);
		process.exit();
	} catch (err) {
		console.error(err);
		console.log("Please check the error message.");
		process.exit(1);
	}
});
