const User = require("../model/User");
const bcrypt = require("bcrypt");

const authController = async (req, res) => {
  const { username, password } = req.body;
  // NO username or password
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) return res.status(200).json({ message: "Login success" });
  return res.status(401).json({ message: "Wrong username or password" });
};

module.exports = authController;
