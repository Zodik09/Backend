const jwt = require("jsonwebtoken");
const userModel = require("../models/auth.model");

const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message:
                "Unauthorised: Invalid Token. Please login to access this resource.",
        });
    }
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel
            .findOne({ _id: verifyToken.id })
            .select("-password -__v");

        if (!user) {
            return res.status(404).json({
                message: "User not found!",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message:
                "Unauthorised: Invalid Token. Please login to access this resource.",
        });
    }
};

module.exports = authMiddleware;
