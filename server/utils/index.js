import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfs, gridfsBucket;

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    gridfsBucket = new GridFSBucket(conn.connection.db, {
      bucketName: "uploads",
    });

    gfs = gridfsBucket; // Use the same instance
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export { dbConnection, gfs, gridfsBucket };

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // ✅ Required for cross-site cookies
    sameSite: "none", // ✅ Needed for Netlify frontend
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};
