const Project = require("../models").models.projects;
const Task = require("../models").models.tasks;

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      // include: [{ model: Task, as: "tasks" }],
      where: {
        user_id: req.user.id,
      },
    });
    if (projects[0]) {
      return res.json(projects);
    } else {
      return res.status(404).json({ message: "No projects found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  if (isNaN(req.params.projectId)) {
    return res.status(400).json({ message: "projectId must be a number" });
  }
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.projectId,
        user_id: req.user.id,
      },
    });

    if (project) {
      return res.json(project);
    } else {
      return res.status(404).json({ message: "No project found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ user_id: req.user.id, ...req.body });
    if (project) {
      return res.json(project);
    } else {
      return res.status(404).json({ message: "Couldn't add project" });
    }
  } catch (error) {
    console.log(error.stack);

    return res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const result = await Project.update(req.body, {
      where: {
        id: req.query.projectId,
        user_id: req.user.id,
      },
    });
    if (result[0]) {
      return res.json({ message: "Project updated" });
    } else {
      return res.status(404).json({ message: "Couldn't update project!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const result = await Project.destroy({
      where: {
        id: req.query.projectId,
        user_id: req.user.id,
      },
    });
    if (result) {
      return res.json({ message: "Project deleted" });
    } else {
      return res.status(404).json({ message: "Couldn't delete project!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
