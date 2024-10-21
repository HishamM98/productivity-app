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

    return { user, token };
  },

  async register(userData) {
    const user = await User.create(userData);

    return user;
  },
};
