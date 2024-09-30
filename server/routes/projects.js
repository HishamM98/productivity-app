const router = require("express").Router();
const projectController = require("../controllers/project");

router.get("/", projectController.getUserProjects);
router.get("/:id", projectController.getUserProjectById);
router.post("/create-project", projectController.createUserProject);
router.put("/update-project/:id", projectController.updateUserProject);
router.delete("/delete-project/:id", projectController.deleteUserProject);

module.exports = router;
