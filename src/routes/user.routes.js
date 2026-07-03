import { Router } from "express";

import * as userController from "../controllers/user.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../validators/user.validation.js";

const router = Router();

/**
 * GET /api/v1/users
 */
router.get("/", userController.getUsers);

/**
 * GET /api/v1/users/:id
 */
router.get(
  "/:id",
  validate(userIdSchema),
  userController.getUserById
);

/**
 * POST /api/v1/users
 */
router.post(
  "/",
  validate(createUserSchema),
  userController.createUser
);

/**
 * PATCH /api/v1/users/:id
 */
router.patch(
  "/:id",
  validate(updateUserSchema),
  userController.updateUser
);

/**
 * DELETE /api/v1/users/:id
 */
router.delete(
  "/:id",
  validate(userIdSchema),
  userController.deleteUser
);

export default router;