const Project = require("../models").models.projects;
const Task = require("../models").models.tasks;

exports.getUserProjects = async (req, res) => {
  try {
    if (!req.query.userId || isNaN(req.query.userId)) {
      return res
        .status(400)
        .send({ message: "User ID is missing or not a number" });
    }
    const projects = await Project.findAll({
      // include: [{ model: Task, as: "tasks" }],
      where: {
        user_id: req.query.userId,
      },
    });
    if (projects[0]) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "No projects found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProjectById = async (req, res) => {
  try {
    if (
      !req.params.id ||
      isNaN(req.params.id) ||
      !req.query.userId ||
      isNaN(req.query.userId)
    ) {
      return res.status(400).send({
        message: "User ID and/or project ID is missing or not a number",
      });
    }

    const project = await Project.findAll({
      where: {
        id: req.params.id,
        user_id: req.query.userId,
      },
    });
    if (project[0]) {
      res.json(project);
    } else {
      res.status(404).json({ message: "No project found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUserProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Couldn't add project" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProject = async (req, res) => {
  try {
    const result = await Project.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (result[0]) {
      res.json({ message: "Project updated" });
    } else {
      res.status(404).json({ message: "Couldn't update project!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUserProject = async (req, res) => {
  try {
    const result = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (result) {
      res.json({ message: "Project deleted" });
    } else {
      res.status(404).json({ message: "Couldn't delete project!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
