import Notice from "../models/notification.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { createJWT } from "../utils/index.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });

    if (user) {
      if (isAdmin) createJWT(res, user._id);
      user.password = undefined;

      res.status(201).json(user);
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid User data" });
    }
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Login Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Missing email or password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password." });
    }

    if (!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, contact the administrator",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJWT(res, user._id);
      user.password = undefined;
      return res.status(200).json(user);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login Error:", err); // Debugging line
    return res.status(400).json({ status: false, message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
     res.cookie("token", "", {
       httpOnly: true,
       expires: new Date(0),
       secure: true,
       sameSite: "none",
     });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");

    res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

export const getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;

    const notice = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(200).json(notice);
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id, name, title, role } = req.body;

    const id = isAdmin && userId !== _id ? _id : userId;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    user.name = name || user.name;
    user.title = title || user.title;
    user.role = role || user.role;

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const { isReadType, id } = req.query;

    const update = { $push: { isRead: userId } };
    const filter =
      isReadType === "all"
        ? { team: userId, isRead: { $nin: [userId] } }
        : { _id: id, isRead: { $nin: [userId] } };

    await Notice.updateMany(filter, update);

    res.status(200).json({ status: true, message: "Notifications updated" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    user.password = req.body.password;
    await user.save();

    res
      .status(200)
      .json({ status: true, message: "Password changed successfully." });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    user.isActive = req.body.isActive;
    await user.save();

    res.status(200).json({
      status: true,
      message: `User account has been ${
        user.isActive ? "activated" : "disabled"
      }`,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user)
      return res.status(404).json({ status: false, message: "User not found" });

    res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};
