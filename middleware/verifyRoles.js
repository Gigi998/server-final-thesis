const verifyRoles = (...roles) => {
  return (req, res, next) => {
    if (!req?.roles) res.sendStatus(401);
    // Get user roles
    const userRoles = req.roles;
    // Roles we passed to func as parametar
    const allowedRoles = [...roles];
    // Compare user roles with allowed roles and if there is a match user is authorized
    const newArr = userRoles
      .map((role) => allowedRoles.includes(role))
      .find((r) => r === true);
    if (!newArr) return res.status(401).json({ message: "Unauthorized" });
    next();
  };
};

module.exports = verifyRoles;
