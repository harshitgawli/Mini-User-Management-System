import AdminServices from "../Services/AdminServices.js";

const AdminControllers = {};

/**
 * Get all users (admin only)
 * Query params: page, limit
 */
AdminControllers.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await AdminServices.getAllUsers(page, limit);

    if (result.status === "ERR") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};

/**
 * Activate user
 */
AdminControllers.activateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await AdminServices.updateUserStatus(userId, "active");

    if (result.status === "ERR") {
      return res.status(400).send(result);
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};

/**
 * Deactivate user
 */
AdminControllers.deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await AdminServices.updateUserStatus(userId, "inactive");

    if (result.status === "ERR") {
      return res.status(400).send(result);
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};

export default AdminControllers;
