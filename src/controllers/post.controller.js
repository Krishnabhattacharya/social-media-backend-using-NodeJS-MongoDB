
import { CommentPost, Post } from '../models/post.model.js'
export const makePostController = async (req, res) => {
    try {
        const { content, postImage } = req.body;
        if (!content) {
            return res.status(400).json({ success: false, message: "Post description is required" });
        }
        const post = new Post({ content, postImage, author: req.user._id });
        await post.save();
        res.status(201).send({ success: true, post: post });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const getAllPostController = async (req, res) => {
    try {
        const post = await Post.find({}).limit(20).populate('author', 'name').populate('commment');
        await Post.populate(post, {
            path: 'commment.author'
        });
        if (!post) {
            return res.status(404).json({ success: false, message: "No post Avaiable" });
        }
        res.status(200).send({
            success: true,
            posts: post
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const updatePostController = async (req, res) => {
    try {
        const postId = req.params.postId;
        // console.log(postId);
        const { content } = req.body;
        const post = await Post.findById(postId).populate('author', 'name');;
        if (!post) {
            return res.status(404).json({ success: false, message: "No post Avaiable" });
        }
        if (content) {
            post.content = content;
        }
        await post.save();
        res.status(200).send({
            success: true,
            post: post
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const deletePostController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "No post found with the specified ID" });
        }
        res.status(200).send({
            success: true,
            post: post
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const getPerUserPost = async (req, res) => {
    try {
        const id = req.user._id;
        const post = await Post.find({ 'author': id }).limit(20).populate('author', 'name').populate('commment');
        await Post.populate(post, {
            path: 'commment.author'
        });
        res.status(200).send({ success: true, posts: post });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const likeUnlikePostController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        const alreadyLiked = post.like.includes(userId);
        if (alreadyLiked) {
            const index = post.like.indexOf(userId);
            if (index > -1) {
                post.like.splice(index, 1);
            }
        }
        else {
            post.like.push(userId);
        }
        await post.save();
        res.status(200).send({
            success: true,
            post: post
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const checkLikeunlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if (!post) {

            return res.status(404).json({ success: false, message: "Post not found" });
        }
        const isLiked = post.like.includes(userId);

        res.status(200).send({
            success: true,
            isLiked: isLiked
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const commentPostController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const { content } = req.body;
        const post = await Post.findById(postId).populate('author');
        if (!post) {

            return res.status(404).json({ success: false, message: "Post not found" });
        }
        const comment = new CommentPost({
            content: content,
            author: userId,
            post: postId
        });
        await comment.save();
        post.commment.push(comment._id);
        await post.save();
        //await comment.populate('author')
        await post.populate('commment');
        await Post.populate(post, {
            path: 'commment.author'
        });
        res.status(200).send({
            success: true,
            post: post
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
export const deleteComment = async (req, res) => {
    try {

        const commentId = req.params.commentId;
        const postId = req.params.postId;
        const userId = req.user._id;

        const post = await Post.findById(postId).populate('author');
        if (!post) {

            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const index = post.commment.indexOf(commentId);
        if (index === -1) {

            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        post.commment.splice(index, 1);


        await post.save();
        await post.populate('commment');
        await Post.populate(post, {
            path: 'commment.author'
        });
        res.status(200).send({
            success: true,
            post: post
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}