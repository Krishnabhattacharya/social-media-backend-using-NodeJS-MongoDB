import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
    content: {
        type: String,
        default: '',
    },
    postImage: {
        type: String,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    commment: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }],
    like: [{
        type: mongoose.Types.ObjectId,
        ref: "Like"
    }]

}, { timestamps: true });
const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const likeShema = mongoose.Schema({
    isLiked: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });
const Like = mongoose.model("Like", likeShema);
const Post = mongoose.model("Post", postSchema);
const CommentPost = mongoose.model("Comment", commentSchema);
export { Post, Like, CommentPost }