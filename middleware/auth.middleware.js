function isGuest(req, res, next) {
  if (!req.session.user) {
    next();
    return;
  }
  res.redirect("/user/dashboard");
}

function isUser(req, res, next) {
  if (req.session.user) {
    next();
    return;
  }
  res.redirect("/auth/login");
}

module.exports = { isGuest, isUser };
