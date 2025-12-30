import User from "../Models/User.js";

const UserServices = {};

/**
 * Get user by email
 */
UserServices.getUserByEmail = async (email) => {
  try {
    const userData = await User.findOne({ email }).select("+password");

    if (userData) {
      return {
        status: "OK",
        msg: "User Found Successfully",
        data: [userData],
      };
    } else {
      return {
        status: "OK",
        msg: "User Not Found With Given Email",
        data: [],
      };
    }
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

/**
 * Signup user (password already hashed)
 */
UserServices.signup = async ({ fullName, email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: "ERR",
        msg: "Email already registered",
        data: [],
      };
    }

    const user = await User.create({
      fullName,
      email,
      password,          // already hashed
      role: "user",
      status: "active",
    });

    return {
      status: "OK",
      msg: "User Signup Successfully",
      data: [user],
    };
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

/**
 * Update last login
 */
UserServices.updateLastLogin = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      lastLogin: new Date(),
    });

    return {
      status: "OK",
      msg: "Last login updated",
      data: [],
    };
  } catch (err) {
    return {
      status: "ERR",
      msg: err.message,
      data: [],
    };
  }
};

export default UserServices;
