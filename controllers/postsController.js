const { createPostSchema } = require('../middlewares/validator');
const Post = require('../models/postsModel');

exports.getPosts = async (req, res) => {
	const { page } = req.query;
	const postsPerPage = 10;

	try {
		let pageNum = 0;
		if (page <= 1) {
			pageNum = 0;
		} else {
			pageNum = page - 1;
		}
		const result = await Post.find()
			.sort({ createdAt: -1 })
			.skip(pageNum * postsPerPage)
			.limit(postsPerPage)
			.populate({
				path: 'userID',
				select: 'email',
			});
		res.status(200).json({ success: true, message: 'posts', data: result });
	} catch (error) {
		console.log(error);
	}
};

exports.singlePost = async (req, res) => {
	const { _id } = req.query;

	try {
		const existingPost = await Post.findOne({ _id }).populate({
			path: 'userID',
			select: 'email',
		});
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Post unavailable' });
		}
		res
			.status(200)
			.json({ success: true, message: 'single post', data: existingPost });
	} catch (error) {
		console.log(error);
	}
};

exports.updatePost = async (req, res) => {
	const { _id } = req.query;
	const { title, description } = req.body;
	const { userID } = req.user;
	try {
		const { error, value } = createPostSchema.validate({
			title,
			description,
			userID,
		});
		console.log(_id,title, description, userID);
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}
		const existingPost = await Post.findOne({ _id });
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Post unavailable' });
		}
		if (existingPost.userID.toString() !== userID) {
			return res.status(403).json({ success: false, message: 'Unauthorized' });
		}
		existingPost.title = title;
		existingPost.description = description;

		const result = await existingPost.save();
		res.status(200).json({ success: true, message: 'Updated', data: result });
	} catch (error) {
		console.log(error);
	}
};

exports.deletePost = async (req, res) => {
	const { _id } = req.query;
	try {
		const existingPost = await Post.findOne({ _id });
		if (!existingPost) {
			return res
				.status(404)
				.json({ success: false, message: 'Post already unavailable' });
		}

		await Post.deleteOne({ _id });
		res.status(200).json({ success: true, message: 'deleted' });
	} catch (error) {
		console.log(error);
	}
};

exports.createPosts = async (req, res) => {
	const { title, description, category,subcategory, content } = req.body;
	console.log(req.body);
	const { userID } = req.user;
	console.log(req.user);
	const image = req.file
	  ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
	  : null;
	try {
		const { error, value } = createPostSchema.validate({
			title,
			description,
			category,
			subcategory,
			content,
			image,
			userID,
		});
		if (error) {
			console.error(error);
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message, title, description, });
		}

		const result = await Post.create({
			title,
			description,
			category,
			subcategory,
			content,
			image,
			userID
		});
		res.status(201).json({ success: true, message: 'created', data: result });
	} catch (error) {
		console.log(error);
	}
};

exports.getPostsByUser = async (req, res) => {
}

exports.getPostsByCategory = async (req, res) => {
	const { category } = req.query;
	try {
		const result = await Post.find({ category }).sort({createdAt: -1}).populate({
			path: 'userID',
			select: 'email',
		});
		if (!result) {
			return res.status(404).json({ success: false, message: 'No posts' });
		}
		res.status(200).json({ success: true, message: 'posts', data: result });
	}
	catch (error) {
		console.log(error);
	}
}

exports.getPostsBySubCategory = async (req, res) =>{
	const {category, subcategory} = req.query;
	try{
		const result = await Post.find({ subcategory, category }).sort({createdAt: -1}).populate({
			path: 'userID',
			select: 'email',
		});
		if (!result) {
			return res.status(404).json({ success: false, message: 'No posts' });
		}
		res.status(200).json({ success: true, message: 'posts', data: result });
	}
	catch (error) {
		console.log(error);
	}
}

exports.getPostsByUser = async (req, res) => {
	const { userID } = req.query;
	try {
		const result = await Post.find({ userID }).populate({
			path: 'userID',
			select: 'email',
		});
		if (!result || result.length === 0) {
			return res.status(404).json({ success: false, message: 'No posts' });
		}
		res.status(200).json({ success: true, message: 'posts by', data: result });
	}
	catch (error) {
		console.log(error);
	}
}

exports.getPostsByTitle = async (req, res) => {
	const { title } = req.query;
	try {
		const result = await Post.find({ title: { $regex: title, $options: 'i' } }).sort({createdAt: -1}).populate({
			path: 'userID',
			select: 'email',
		});
		if (!result) {
			return res.status(404).json({ success: false, message: 'No posts' });
		}
		res.status(200).json({ success: true, message: 'posts', data: result });
	}
	catch (error) {
		console.log(error);
	}
}	
