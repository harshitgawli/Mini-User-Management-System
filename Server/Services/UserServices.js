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


// update profile
UserServices.updateProfile = async (userId, { fullName, email }) => {
  try {
    const emailExists = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (emailExists) {
      return {
        status: "ERR",
        msg: "Email already in use",
        data: [],
      };
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, email },
      { new: true }
    );

    if (!user) {
      return {
        status: "ERR",
        msg: "User not found",
        data: [],
      };
    }

    return {
      status: "OK",
      msg: "Profile updated successfully",
      data: [user],
    };
  } catch (err) {
    return { status: "ERR", msg: err.message, data: [] };
  }
};


// change pwd
UserServices.changePassword = async (userId, newPassword) => {
  try {
    await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });

    return {
      status: "OK",
      msg: "Password changed successfully",
      data: [],
    };
  } catch (err) {
    return { status: "ERR", msg: err.message, data: [] };
  }
};


export default UserServices;
