const User = require("../model/User");
const jwt = require("jsonwebtoken");

const refreshController = async (req, res) => {
  const cookies = req.cookies;
  // Check if we have cookie
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const findUser = await User.findOne({ refreshToken }).exec();
  if (!findUser) return res.sendStatus(403);
  // Get data from jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || findUser.username !== decoded.username)
      return res.sendStatus(403); //Unauthorized
    //   Grab username
    const user = findUser.username;
    //   Grab roles
    const roles = Object.values(findUser.roles).filter(Boolean);
    //   Create new accToken
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    return res.status(200).json({ accessToken });
  });
};

module.exports = refreshController;
