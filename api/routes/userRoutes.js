const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  makeUserAdmin,
} = require("../controllers/userController");
const { checkAdmin } = require("../middleware/adminMiddleware");
const app = Router();
const { protect } = require("../middleware/authMiddleware");
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/me", protect, getMe);
app.post("/makeAdmin/:id", checkAdmin, makeUserAdmin);
module.exports = app;
