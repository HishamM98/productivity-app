const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.delete("/delete-user", (req, res, next) => {
  if (req.query.email) {
    userController.deleteUserByEmail(req, res, next);
  } else if (req.query.username) {
    userController.deleteUserByUsername(req, res, next);
  } else {
    res
      .status(400)
      .json({ message: "Missing email or username query parameter" });
  }
});

module.exports = router;
