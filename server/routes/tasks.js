const router = require("express").Router();
const taskController = require("../controllers/task");

router.get("/tasks-status", taskController.getTasksByStatus);
router.get("/project-status", taskController.getProjectTasksByStatus);
router.get("/user-status", taskController.getUserTasksByStatus);

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.get("/project-tasks/:projectId", taskController.getTasksByProjectId);
router.get("/user-tasks/:userId", taskController.getTasksByUserId);

router.post("/create-task", taskController.createTask);
router.post("/use-task-tag", taskController.useTaskTag);
router.delete("/remove-task-tag", taskController.removeTaskTag);
router.put("/update-task/:id", taskController.updateTask);
router.delete("/delete-task/:id", taskController.deleteTask);

module.exports = router;
