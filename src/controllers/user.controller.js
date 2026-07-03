import * as userService from "../services/user.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";

/**
 * @desc    Create a new user
 * @route   POST /api/v1/users
 * @access  Public
 */
export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      "User created successfully.",
      user
    )
  );
});

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Public
 */
export const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(200).json(
    new ApiResponse(
      200,
      "Users fetched successfully.",
      users
    )
  );
});

/**
 * @desc    Get single user
 * @route   GET /api/v1/users/:id
 * @access  Public
 */
export const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User fetched successfully.",
      user
    )
  );
});

/**
 * @desc    Update user
 * @route   PATCH /api/v1/users/:id
 * @access  Public
 */
export const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "User updated successfully.",
      updatedUser
    )
  );
});

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/:id
 * @access  Public
 */
export const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User deleted successfully.",
      null
    )
  );
});