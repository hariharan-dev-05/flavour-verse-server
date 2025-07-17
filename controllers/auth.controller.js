import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, username, password, role = "user" } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User Registered." });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ message: "You don't have an account. Kindly register." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Email or Password is wrong" });

        // Access Token (short-lived)
        const accessToken = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Refresh Token (longer-lived)
        const refreshToken = jwt.sign(
            { email: user.email },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        // Send Refresh Token as HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set true in production
            sameSite: "Strict", // or 'Lax' if frontend and backend are same origin
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            accessToken,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}