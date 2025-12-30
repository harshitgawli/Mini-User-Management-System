import UserServices from "../Services/UserServices.js";
import hashPassword from "../utils/password/hashPassword.js";
import verifyPassword from "../utils/password/verifyPassword.js";
import { generateToken } from "../utils/token/generateToken.js";
import {
  userSignUpValidationSchema,
  userLoginValidationSchema,
} from "../Validations/UserValidation.js";

const userControllers = {};

/**
 * Signup
 */
userControllers.signup = async (req, res) => {
  try {
    const { value, error } = userSignUpValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: "ERR",
        msg: error.message,
        data: [],
      });
    }

    // hash password here (as decided)
    const hashedPassword = await hashPassword(value.password);
    value.password = hashedPassword;

    const result = await UserServices.signup(value);

    if (result.status === "ERR") {
      return res.status(400).send(result);
    }

    const userObj = result.data[0].toObject();
    delete userObj.password;

    const token = generateToken({
      id: userObj._id,
      email: userObj.email,
      role: userObj.role,
    });

    userObj.token = token;

    return res.status(201).send({
      status: "OK",
      msg: "User signup successfully",
      data: [userObj],
    });
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};

/**
 * Login
 */
userControllers.login = async (req, res) => {
  try {
    const { value, error } = userLoginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: "ERR",
        msg: error.message,
        data: [],
      });
    }

    const userRes = await UserServices.getUserByEmail(value.email);

    if (userRes.status === "ERR") {
      return res.status(500).send(userRes);
    }

    if (userRes.data.length === 0) {
      return res.status(401).send({
        status: "ERR",
        msg: "Invalid email or password",
        data: [],
      });
    }

    const user = userRes.data[0];

    // block inactive users
    if (user.status !== "active") {
      return res.status(403).send({
        status: "ERR",
        msg: "User account is inactive",
        data: [],
      });
    }

    const passwordCheck = await verifyPassword(
      value.password,
      user.password
    );

    if (!passwordCheck) {
      return res.status(401).send({
        status: "ERR",
        msg: "Invalid email or password",
        data: [],
      });
    }

    await UserServices.updateLastLogin(user._id);

    const userObj = user.toObject();
    delete userObj.password;

    const token = generateToken({
      id: userObj._id,
      email: userObj.email,
      role: userObj.role,
    });

    userObj.token = token;

    return res.status(200).send({
      status: "OK",
      msg: "User login successfully",
      data: [userObj],
    });
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};

/**
 * Get current logged-in user
 */
userControllers.getCurrentUser = async (req, res) => {
  try {
    const { email } = req.user;

    const response = await UserServices.getUserByEmail(email);

    if (response.status === "ERR") {
      return res.status(500).send(response);
    }

    if (response.data.length === 0) {
      return res.status(404).send({
        status: "ERR",
        msg: "User not found",
        data: [],
      });
    }

    const userObj = response.data[0].toObject();
    delete userObj.password;

    return res.status(200).send({
      status: "OK",
      msg: "User fetched successfully",
      data: [userObj],
    });
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};


/**
 * Logout
 */
userControllers.logout = async (req, res) => {
  try {
    // JWT stateless hota hai, backend sirf success response deta hai
    return res.status(200).send({
      status: "OK",
      msg: "User logged out successfully",
      data: [],
    });
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};




export default userControllers;
