const User = require("../models").models.users;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "Couldn't create user!" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const result = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
    });
    if (result[0]) {
      res.json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "Couldn't update user!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({
      where: {
        id: req.user.id,
      },
    });
    if (result) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "Couldn't delete user!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.deleteUserByEmail = async (req, res) => {
//   try {
//     const result = await User.destroy({
//       where: {
//         email: req.query.email,
//       },
//     });
//     if (result) {
//       res.json({ message: "User deleted" });
//     } else {
//       res.status(404).json({ message: "Couldn't delete user!" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deleteUserByUsername = async (req, res) => {
//   try {
//     const result = await User.destroy({
//       where: {
//         username: req.query.username,
//       },
//     });
//     if (result) {
//       res.json({ message: "User deleted" });
//     } else {
//       res.status(404).json({ message: "Couldn't delete user!" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
