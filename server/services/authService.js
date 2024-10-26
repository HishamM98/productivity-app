const jwt = require("jsonwebtoken");
const User = require("../models").models.users;
const config = require("../config/auth");
const bcrypt = require("bcrypt");

module.exports = {
  async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid username or password or user doesn't exist!");
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: "1d",
    });

    const refreshToken = createRefreshToken(user.id);

    return { user, token, refreshToken };
  },

  async register(userData) {
    const user = await User.create(userData);

    return user;
  },

  async refreshToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, config.refreshJwtSecret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error("Tampered Token!");
    }

    const newToken = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: "1d",
    });

    return newToken;
  },
};

function createRefreshToken(id) {
  const refreshToken = jwt.sign({ id }, config.refreshJwtSecret, {
    expiresIn: "7d",
  });
  return refreshToken;
}
