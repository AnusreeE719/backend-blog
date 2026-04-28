import { body, param } from "express-validator";

export const createBlogValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("content")
    .trim()
];

export const updateBlogValidation = [
  param("blogId")
    .isMongoId()
    .withMessage("Invalid blog ID"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("content")
    .optional()
    .trim(),

];