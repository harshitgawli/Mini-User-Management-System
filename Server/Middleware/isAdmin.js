const isAdmin = (req, res, next) => {
  try {
    // req.user verifyToken middleware se aata hai
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).send({
        status: "ERR",
        msg: "Admin access only",
        data: [],
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      status: "ERR",
      msg: err.message,
      data: [],
    });
  }
};

export default isAdmin;
