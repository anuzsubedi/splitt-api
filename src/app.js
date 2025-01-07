import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(logger);

// Routes
app.use("/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
