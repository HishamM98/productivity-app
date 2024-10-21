// controllers/authController.js
const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login(username, password);
    // res.cookie("auth", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Use secure in production
    //   sameSite: "strict",
    //   maxAge: 24 * 60 * 60 * 1000,
    // }); //1day
    delete user.dataValues.password;
    res.json({ user, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

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
