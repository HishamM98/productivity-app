// controllers/authController.js
const authService = require("../services/authService");

/**
 * a function that a user's username and password and attempts login process and returns user's data and auth token in case of successful login and error message when attempt fails
 * @param req
 * @param res
 *
 * @returns {{user: User, token: string}}
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token, refreshToken } = await authService.login(
      username,
      password
    );
    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); //7days
    delete user.dataValues.password;
    res.json({ user, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * a function that takes user data to register a new user and returns a message of success/failure
 * @param req
 * @param res
 *
 * @returns {{message: string}}
 */
exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    if (user) {
      res.status(201).json({ message: "Registered Successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * a function that takes a refresh token, verifies it and then issues a new replacement auth token for the expired auth token
 * @param  req.cookies.refreshToken
 * @param  res
 *
 * @returns {{token: string}}
 */
exports.refreshToken = async (req, res) => {
  if (!req.cookies?.refresh) {
    return res.status(401).json({ message: "unauthorized access!" });
  }

  try {
    const token = await authService.refreshToken(req.cookies?.refresh);

    if (token) {
      res.json({ token });
    } else {
      res.status(406).json({ message: "some error occurred" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
