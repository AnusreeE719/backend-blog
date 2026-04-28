import express from "express";
import { LogIn, LogOut, SignUp } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginValidation, signupValidation } from "../validators/authValidators.js";


const router = express.Router();

router.post("/reister", signupValidation, validate, SignUp);

router.post("/login", loginValidation, validate, LogIn);

router.post("/logout", LogOut);

export default router;