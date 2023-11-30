const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  const User = await user.findOne({ email });
  if (User) {
    const passMatched = await bcrypt.compare(password, User.password);
    if (passMatched) {
      const accessToken = jwt.sign(
        {
          User: {
            username: User.username,
            email: User.email,
            id: User._id,
          },
        },
        process.env.TOKEN_SECRET
      );
      res.status(201).json({ message: accessToken });
    } else {
      res.status(400).json({ message: "Wrong Password" });
    }
  } else {
    res.status(400);
    throw new Error("Wrong Email");
  }
});

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  const isRegister = await user.findOne({ email });
  if (isRegister) {
    res.status(400);
    throw new Error("This email is already taken");
  }
  const hash = await bcrypt.hash(password, 10);
  //   console.log("pass", password);
  //   console.log("hashpass", hash);
  const User = await user.create({
    username,
    email,
    password: hash,
  });
  if (User) {
    res.status(201).json({ id: User._id, email: User.email });
  } else {
    res.status(400);
    throw new Error("Error Signup");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { login, signup, currentUser };
