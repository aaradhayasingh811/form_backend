import express from "express";
import cors from "cors";
import { router } from "../src/routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Routes
app.use("/api/v1", router);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Export app
export { app };
