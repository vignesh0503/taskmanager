import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";

dotenv.config();

// Connect to database
dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "https://merntask-task-manager.netlify.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Manually set CORS headers for preflight requests
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://merntask-task-manager.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// API routes
app.use("/api", routes);

// Error handling
app.use(routeNotFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
