import { response } from "express";
import comment from "../model/comment.js"


export const createComment = async(request, response) => {
    try {
        const Comment = await new comment(request.body);
        Comment.save();
        response.status(200).json({ msg: 'Comment saved successfully' })
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getComments = async(request, response) => {
    try {
        const comments = await comment.find({ postId: request.params.id })
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deleteTheComment = async(request, response) => {
    try {
        const Comment = await comment.findById(request.params.id);
        await Comment.delete();

        response.status(200).json({ msg: 'Comment deleted Successfully' })
    } catch (error) {
        response.status(500).json(error);
    }
}