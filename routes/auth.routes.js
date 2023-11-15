const express = require("express");
const authRouter = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

authRouter.get("/auth/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRouter.post("/auth/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render("auth/signup", { error: "All fields are required" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.render("auth/signup", { error: "User already exist" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("internal server error");
  }
});

authRouter.get("/auth/login", (req, res, next) => {
  res.render("auth/login");
});

authRouter.post("/auth/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.render("auth/login", { error: "All fields are required" });
    return;
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    res.render("auth/login", { error: "User does not exist" });
    return;
  }

  const { password: hashedPassword } = foundUser;
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordMatch) {
    res.render("auth/login", { error: "Wrong Password" });
    return;
  }

  req.session.currentUser = foundUser;
  res.redirect("/user/dashboard");
});

module.exports = authRouter;
