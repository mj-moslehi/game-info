const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    var authHeader = req.body.authorization;

    if (!authHeader) {
      authHeader = req.headers.authorization;
    }

    if (!authHeader)
      throw new Error(
        "Authorization header is missing or improperly formatted (expecting 'Bearer <token>')"
      );
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      deleted: false,
      enable: true,
    });
    if (!user) {
      throw new Error("User account is disabled or does not exist.");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token. Please log in again." });
    }
    res
      .status(401)
      .json({ error: "Please authenticate or check your account status." });
  }
};

module.exports = authenticate;
