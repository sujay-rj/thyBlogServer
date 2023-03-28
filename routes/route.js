import express from "express";
// import Login from "../../client/src/component/account/Login.jsx";

import { signupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage, getImage } from "../controller/image-controller.js";
import { saveCreatePost, getPosts, getPost, updateThePost, deleteThePost } from '../controller/post-controller.js'

import upload from '../utils/upload.js';
import { createComment, getComments, deleteTheComment } from "../controller/comment-controller.js";
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', saveCreatePost);
router.get('/posts', getPosts);
router.get('/post/:id', getPost);
router.put('/update/:id', updateThePost);
router.delete('/delete/:id', deleteThePost);
router.post('/comment/new', createComment);
router.get('/comments/:id', getComments);
router.delete('/comment/delete/:id', deleteTheComment);

export default router;