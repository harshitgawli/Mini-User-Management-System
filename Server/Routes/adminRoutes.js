import express from "express";
import AdminControllers from "../Controllers/adminController.js";
import verifyToken from "../Middleware/verifyToken.js";
import isAdmin from "../Middleware/isAdmin.js";

const route = express.Router();

/**
 * Admin routes (protected)
 */

// get all users (pagination)
route.get(
  "/users",
  verifyToken,
  isAdmin,
  AdminControllers.getAllUsers
);

// activate user
route.post(
  "/users/:userId/activate",
  verifyToken,
  isAdmin,
  AdminControllers.activateUser
);

// deactivate user
route.post(
  "/users/:userId/deactivate",
  verifyToken,
  isAdmin,
  AdminControllers.deactivateUser
);

export default route;
