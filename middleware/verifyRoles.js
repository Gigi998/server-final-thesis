const User = require("../model/User");

const verifyRoles = (...roles) => {
  return (req, res, next) => {
    if (!req?.roles) res.sendStatus(401);
    const userRoles = req.roles;
    const allowedRoles = [...roles];
    const newArr = userRoles
      .map((role) => allowedRoles.includes(role))
      .find((r) => r === true);
    if (!newArr) return res.status(401).json({ message: "Unauthorized" });
    next();
  };
};

module.exports = verifyRoles;
