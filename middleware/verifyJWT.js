const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // Get header, where Bearer token is placed
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });
  if (!authHeader.startsWith("Bearer ")) return res.sendStatus(401);
  // Split token
  const token = authHeader.split(" ")[1];
  // Check if token is valid
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //Invalid token
    // Set roles and username from decoded access token
    req.roles = decoded.UserInfo.roles;
    req.username = decoded.UserInfo.username;
    next();
  });
};

module.exports = verifyJWT;
