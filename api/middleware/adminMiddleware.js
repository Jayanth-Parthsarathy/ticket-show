const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const checkAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      req.isAdmin = req.user.isAdmin;
      if (!req.isAdmin) {
        throw new Error("Not an admin");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorised");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorised");
  }
});

module.exports = {
  checkAdmin,
};
