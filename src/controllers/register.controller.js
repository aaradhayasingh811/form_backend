import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();

    // Respond with necessary user details
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default registerController;
