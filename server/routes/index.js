import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadFile, getFile } from "../controllers/fileController.js";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

// ✅ Ensure `/upload` is correctly registered
router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:filename", getFile);

// Debug: Log routes
router.stack.forEach((route) => {
  console.log(route.route ? route.route.path : route.name);
});

export default router;
