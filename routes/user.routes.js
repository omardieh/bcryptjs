const express = require("express");
const userRouter = express.Router();
const { isUser } = require("../middleware/auth.middleware");

userRouter.get("/user/dashboard", isUser, (req, res, next) => {
  res.render("user/dashboard", { user: req.session.currentUser });
});

module.exports = userRouter;
