const Task = require("../models").models.tasks;

exports.verifyTask = async function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  if (!req.query.taskId) {
    return res.status(400).json({ message: "taskId must be provided" });
  }
  if (isNaN(req.query.taskId)) {
    return res.status(400).json({ message: "taskId must be a number" });
  }

  try {
    const task = await Task.findOne({
      where: {
        id: req.query.taskId,
        user_id: req.user.id,
      },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    next();
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: error.message });
  }
};
