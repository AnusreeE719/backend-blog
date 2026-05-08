import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createBlogValidation, updateBlogValidation } from "../validators/blogValidators.js";


const router = express.Router();

router.post("/", authMiddleware, createBlogValidation, validate, createBlog);

router.get("/",authMiddleware, getAllBlogs);

// router.get('/', authMiddleware, getBlogs);

router.put("/:blogId", authMiddleware, updateBlogValidation, validate, updateBlog);

router.get("/:blogId", authMiddleware, getBlogById);

router.delete("/:blogId", authMiddleware, deleteBlog);

export default router;