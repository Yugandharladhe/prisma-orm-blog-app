import express from 'express';
import { createPost, getAllPost } from '../controller/PostController.js';
import { createProfile, getAllProfile } from '../controller/ProfileController.js';
import { login, signup } from "../controller/UserController.js";
import protect from '../util/authenticate.js';

const router = express.Router()


router.post("/register",signup);
router.post("/login",login);
router.post("/postBlog",protect,createPost);
router.get("/getAllPosts",protect,getAllPost);
router.post("/createProfile",protect,createProfile);
router.get("/getAllProfiles",protect,getAllProfile);

export default router