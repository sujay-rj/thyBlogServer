import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
    },
    createdDate: {
        type: Date
    }
});

const post = mongoose.model('post', postSchema);

export default post;