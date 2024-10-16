const Project = require("../models").models.projects;

exports.verifyProject = async function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  if (!req.query.projectId && !req.params.projectId) {
    return res.status(400).json({ message: "projectId must be provided" });
  }
  if (isNaN(req.query.projectId) && isNaN(req.params.projectId)) {
    return res.status(400).json({ message: "projectId must be a number" });
  }

  try {
    const project = await Project.findOne({
      where: {
        id: req.query.projectId | req.params.projectId,
        user_id: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    next();
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: error.message });
  }
};
