const router = require("express").Router();
const projectController = require("../controllers/project");

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.post("/create-project", projectController.createProject);
router.put("/update-project/:id", projectController.updateProject);
router.delete("/delete-project/:id", projectController.deleteProject);

module.exports = router;
