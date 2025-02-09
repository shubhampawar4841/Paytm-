const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
});

const signinBody = zod.object({
    username: zod.string().min(3).max(30),
    password: zod.string().min(6),
});

// 🔹 Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { success } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            message: "User created successfully",
            token
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 🔹 Signin Route
router.post("/signin", async (req, res) => {
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "User signed in successfully",
            token
        });

    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 🔹 Secure Bulk Users Route
router.get("/bulk", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find({}, { password: 0 }) // Exclude passwords
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(users);
    } catch (error) {
        console.error("Bulk Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
