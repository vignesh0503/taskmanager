import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadFile, getFile } from "../controllers/fileController.js";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

// ✅ Corrected Upload Route (make sure this exists)
router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:filename", getFile);



export default router;

