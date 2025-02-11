const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// Schema for signup validation
const signupBody = zod.object({
    username: zod.string().email("Invalid email format"),
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
});

router.post("/signup", async (req, res) => {
    try {
        const validationResult = signupBody.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ message: validationResult.error.errors.map(err => err.message).join(", ") });
        }

        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(409).json({ message: "Email already registered. Please use a different one." });
        }

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        });

        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000,
        });

        const token = jwt.sign({ userId }, JWT_SECRET);

        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Schema for signin validation
const signinBody = zod.object({
    username: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
});

router.post("/signin", async (req, res) => {
    try {
        const validationResult = signinBody.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ message: validationResult.error.errors.map(err => err.message).join(", ") });
        }

        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ message: "User not found. Please check your email or sign up first." });
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Schema for updating user info
const updateBody = zod.object({
    password: zod.string().min(6, "Password must be at least 6 characters").optional(),
    firstName: zod.string().min(1, "First name cannot be empty").optional(),
    lastName: zod.string().min(1, "Last name cannot be empty").optional(),
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const validationResult = updateBody.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ message: validationResult.error.errors.map(err => err.message).join(", ") });
        }

        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

// Fetch users in bulk with filtering
router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } },
                { lastName: { "$regex": filter, "$options": "i" } },
            ],
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            })),
        });
    } catch (error) {
        console.error("Bulk user fetch error:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
});

module.exports = router;
