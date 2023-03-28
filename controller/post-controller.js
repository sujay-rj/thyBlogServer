import { response } from "express";
import post from "../model/post.js";



export const saveCreatePost = async(request, response) => {
    try {
        const Post = await new post(request.body);
        Post.save();
        return response.status(200).json('Posted Successfully');
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getPosts = async(request, response) => {
    try {
        let posts = await post.find({});
        return response.status(200).json(posts);

    } catch (error) {
        return response.status(500).json(error);
    }
}

export const getPost = async(request, response) => {
    try {
        const gpost = await post.findById(request.params.id);
        return response.status(200).json(gpost);

    } catch (error) {
        return response.status(500).json(error);
    }
}

export const updateThePost = async(request, response) => {
    try {
        const Post = await post.findById(request.params.id);
        if (!Post) {
            return response.status(404).json({ msg: `post not found` })
        }

        await post.findByIdAndUpdate(request.params.id, { $set: request.body })
        return response.status(200).json({ msg: 'Post updated successfully' });
    } catch (error) {
        return response.status(500).json(error);
    }
}

export const deleteThePost = async(request, response) => {
    try {
        const Post = await post.findById(request.params.id);
        if (!Post) {
            return response.status(404).json({ msg: `post not found` })
        }

        await Post.delete();
        return response.status(200).json({ msg: `Post deleted successfully.` })
    } catch (error) {
        return response.status(500).json(error);
    }
}