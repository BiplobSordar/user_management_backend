import mongoose from "mongoose";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a new user
 */
export const createUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists.");
  }

  const user = await User.create(payload);

  return user;
};

/**
 * Get all users
 */
export const getUsers = async () => {
  const users = await User.find().sort({
    createdAt: -1,
  });

  return users;
};

/**
 * Get user by ID
 */
export const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user id.");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

/**
 * Update user
 */
export const updateUser = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user id.");
  }

  if (payload.email) {
    const existingUser = await User.findOne({
      email: payload.email,
      _id: { $ne: id },
    });

    if (existingUser) {
      throw new ApiError(409, "Email already exists.");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found.");
  }

  return updatedUser;
};

/**
 * Delete user
 */
export const deleteUser = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user id.");
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new ApiError(404, "User not found.");
  }

  return deletedUser;
};