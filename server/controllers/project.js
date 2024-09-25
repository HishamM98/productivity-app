const Project = require("../models").models.projects;

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    if (projects) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "No projects found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "No project found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
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

exports.updateProject = async (req, res) => {
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

exports.deleteProject = async (req, res) => {
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
