const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        postTitle: {
            type: String,
            required: true
        },
        postDesc: {
            type: String,
            required: true
        },
        postImageUrl: {
            type: String,
            required: true
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model("post", PostSchema);