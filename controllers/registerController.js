const User = require("../model/User");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, password } = req.body;
  // NO username or password
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  // If username already exists
  const foundUser = await User.findOne({ username: req.body.username });
  if (foundUser) return res.sendStatus(409);
  try {
    // Hashed password
    const hashedPwd = await bcrypt.hash(password, 10);
    // Create new user
    const result = await User.create({
      username: username,
      password: hashedPwd,
    });
    res.status(201).json({ success: `New user ${username} created!` });
    console.log(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerController;
