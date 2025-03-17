import express from "express";
import upload from "../middlewares/uploadMiddleware.js"; // ✅ Already imported
import { uploadFile, getFile } from "../controllers/fileController.js";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:filename", getFile);

export default router;
