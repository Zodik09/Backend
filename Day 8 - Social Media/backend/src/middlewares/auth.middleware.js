const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Login Required!" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel
      .findOne({ _id: decode.id })
      .select("-password  -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, Login Required!" });
  }
};

module.exports = authMiddleware;
