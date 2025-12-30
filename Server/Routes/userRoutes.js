import express from "express";
import userControllers from "../Controllers/userControllers.js";
import verifyToken from "../Middleware/verifyToken.js";

const route = express.Router();

// auth
route.post("/signup", userControllers.signup);
route.post("/login", userControllers.login);
route.post("/logout", verifyToken, userControllers.logout);

// user
route.get("/me", verifyToken, userControllers.getCurrentUser);
route.post(
  "/profile",
  verifyToken,
  userControllers.updateProfile
);
route.post(
  "/change-password",
  verifyToken,
  userControllers.changePassword
);

export default route;
