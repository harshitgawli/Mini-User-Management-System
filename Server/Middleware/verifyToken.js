import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        status: "ERR",
        msg: "Authorization token missing",
        data: [],
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach decoded user info
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).send({
      status: "ERR",
      msg: "Invalid or expired token",
      data: [],
    });
  }
};

export default verifyToken;
