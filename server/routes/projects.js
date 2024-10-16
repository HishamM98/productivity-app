const router = require("express").Router();
const projectController = require("../controllers/project");
const { authenticate } = require("../middlewares/auth");
const { verifyProject } = require("../middlewares/user-project-verification");

router.get("/", authenticate(), projectController.getProjects);
router.get("/:projectId", authenticate(), projectController.getProjectById);
router.post("/create-project", authenticate(), projectController.createProject);
router.put(
  "/update-project",
  authenticate(),
  verifyProject,
  projectController.updateProject
);
router.delete(
  "/delete-project",
  authenticate(),
  verifyProject,
  projectController.deleteProject
);

module.exports = router;
