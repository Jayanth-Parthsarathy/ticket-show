const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Specify all the details");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const generateJWT = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "30d",
  });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      token: generateJWT(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

const getMe = async (req, res) => {
  const { _id, username, email, isAdmin } = await User.findById(req.user.id);
  res.status(200).json({
    _id: _id,
    username,
    email,
    isAdmin,
  });
};

const makeUserAdmin = asyncHandler( async (req, res) => {
  const update = req.body;
  const newAdmin = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.status(200).send(newAdmin);
});

const checkAdminUser = asyncHandler(async()=>{
  const isAdmin = jwt.verify(req)
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  makeUserAdmin,
};
