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

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

export const getFile = async (req, res) => {
  try {
    if (!gridfsBucket) {
      return res.status(500).json({ message: "GridFS is not initialized" });
    }

    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const downloadStream = gridfsBucket.openDownloadStream(fileId);

    res.set("Content-Type", "image/png"); // Adjust based on file type
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file", error });
  }
};
