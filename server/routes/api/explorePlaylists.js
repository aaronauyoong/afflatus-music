const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Post, Comment, User } = require("../../models");

// get all posts
router.get("/", (req, res) => {
	Post.findAll({
		attributes: ["id", "title", "post_content", "date_created"],
		order: [["date_created", "DESC"]],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_content", "post_id", "user_id", "date_created"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((postData) => res.json(postData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// get one post by pk
router.get("/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ["id", "title", "post_content", "date_created"],
		include: [
			{
				model: Comment,
				attributes: ["id", "comment_content", "post_id", "user_id", "date_created"],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
		],
	})
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: "No post found with this ID." });
				return;
			}
			res.json(postData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
			post_content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// edit exisitng post
router.put("/:id", withAuth, (req, res) => {
	Post.update(
		{
			title: req.body.title,
			post_content: req.body.content,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((postData) => {
			if (!postData) {
				res.status(404).json({ message: "No post found with this ID." });
				return;
			}
			res.json(postData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// delete post
router.delete("/:id", withAuth, (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	}).then((postData) => {
		if (!postData) {
			res.status(404).json({ message: "No post found with this ID" });
			return;
		}
		res.json(postData);
	});
});

module.exports = router;