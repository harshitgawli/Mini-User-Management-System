import User from "../Models/User.js";

const AdminServices = {};

/**
 * Get all users (with pagination)
 */
AdminServices.getAllUsers = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    return {
      status: "OK",
      msg: "Users fetched successfully",
      data: [
        {
          users,
          totalUsers,
          currentPage: Number(page),
          totalPages: Math.ceil(totalUsers / limit),
        },
      ],
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
 * Update user status (active / inactive)
 */
AdminServices.updateUserStatus = async (userId, status) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return {
        status: "ERR",
        msg: "User not found",
        data: [],
      };
    }

    user.status = status;
    await user.save();

    return {
      status: "OK",
      msg: `User ${status} successfully`,
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

export default AdminServices;
