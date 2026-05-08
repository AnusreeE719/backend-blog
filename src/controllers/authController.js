import bcrypt from 'bcryptjs'
import { generateToken } from '../config/generateToken.js';
import User from '../models/userSchema.js';


export const SignUp = async(req, res) => {
    const { name, email, password } = req.body;
    try{
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        if (newUser) {
			// Generate JWT token 
			generateToken(newUser._id, res);
            // const token = generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
                success:true,
				message: "User registered",
				id: newUser._id,
				// name: newUser.name,
				// email: newUser.email,
                // token,
			});
		} else {
			res.status(400).json({success: false, message: "Invalid user data" });
		}
    }catch(error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const LogIn = async(req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        generateToken(user._id, res);
        // const token = generateToken(user._id, res);
        res.status(200).json({
            success: true,
            id: user._id,
            // name: user.name,
            // email: user.email,
            // token,
        });
    } catch(error) {
        console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const LogOut = async (req, res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Something went wrong", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}