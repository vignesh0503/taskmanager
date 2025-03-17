import { gfs, gridfsBucket } from "../utils/index.js";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

// Configure Multer Storage (In-Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${
      process.env.BASE_URL || "https://taskmanager-cmk3.onrender.com"
    }/api/file/${req.file.filename}`;

    console.log(
      "✅ Sending Response:",
      JSON.stringify({ message: "File uploaded successfully", urls: [fileUrl] })
    );

    res.setHeader("Content-Type", "application/json"); // Ensure response is JSON
    res.json({
      message: "File uploaded successfully",
      urls: [fileUrl],
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    res.set("Content-Type", file[0].contentType);
    gridfsBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving file" });
  }
};
