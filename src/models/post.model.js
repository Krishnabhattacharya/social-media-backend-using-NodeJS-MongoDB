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
        ref: "Commnet"
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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });
export const Like = mongoose.model("Like", likeShema);
export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);