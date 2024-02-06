const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.auth = (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }

  try {
    const decodetToken = jwt.verify(token, SECRET);

    req.user = decodetToken;

    next();
  } catch {
    res.clearCookie("auth");
    res.redirect("/auth/login");
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }

  next();
};
