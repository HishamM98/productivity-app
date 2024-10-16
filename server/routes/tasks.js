const router = require("express").Router();
const taskController = require("../controllers/task");
const { authenticate } = require("../middlewares/auth");
const { verifyProject } = require("../middlewares/user-project-verification");
const { verifyTask } = require("../middlewares/user-task-verification");

// router.get("/tasks-status", authenticate(), taskController.getTasksByStatus);
// router.get(
//   "/project-status",
//   authenticate(),
//   taskController.getProjectTasksByStatus
// );
// router.get("/user-status", authenticate(), taskController.getUserTasksByStatus);

// router.get(
//   "/project-tasks/:projectId",
//   authenticate(),
//  verifyProject(),
//   taskController.getTasksByProjectId
// );
// router.get(
//   "/user-tasks",
//   authenticate(),
//   taskController.getTasksByUserId
// );
// router.post("/use-task-tag", authenticate(), verifyTask, taskController.useTaskTag);
// router.delete("/remove-task-tag", authenticate(), verifyTask, taskController.removeTaskTag);

router.get("/", authenticate(), taskController.getAllTasks);
router.get("/:id", authenticate(), taskController.getTaskById);

router.post(
  "/create-task",
  authenticate(),
  verifyProject,
  taskController.createTask
);

router.put(
  "/update-task",
  authenticate(),
  verifyTask,
  taskController.updateTask
);

router.delete(
  "/delete-task",
  authenticate(),
  verifyTask,
  taskController.deleteTask
);

module.exports = router;
