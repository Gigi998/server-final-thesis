const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = async (req, res) => {
  const { username, password } = req.body;
  // NO username or password
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  // Check if we have user
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // Check password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // Access JWT token
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    // RefreshToken
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1D" }
    );
    // New property added
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // Adding refresh token to secure cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    return res.status(401).json({ message: "Wrong username or password" });
  }
};

module.exports = authController;
