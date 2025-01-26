import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import { auth } from "../src/controllers/authController.js";
import dotenv from "dotenv";
const app = express();
const router = express.Router();

dotenv.config();
// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:*',    // Local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(logger);

// Log incoming requests
router.use(logger);

router.post("/google", auth);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Default route
app.get("/", (req, res) => {
    res.send("Server is running. API version: beta 0.2.3");
});

// Routes
app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
