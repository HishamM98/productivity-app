const Task = require("../models/index").models.tasks;
const TaskTagRelation = require("../models/index").models.task_tag_relations;

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      project_id: req.query.projectId,
      user_id: req.user.id,
      ...req.body,
    });
    if (task) {
      return res.status(200).json(task);
    } else {
      return res
        .status(400)
        .send({ message: `Error creating task: ${error.message}` });
    }
  } catch (error) {
    res.status(500).send({ message: `Error creating task: ${error.message}` });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const result = await Task.update(req.body, {
      where: {
        id: req.query.taskId,
      },
    });
    if (result[0]) {
      return res.status(200).send({ message: `Task updated` });
    } else {
      return res
        .status(400)
        .send({ message: `Error updating task: ${error.message}` });
    }
  } catch (error) {
    res.status(500).send({ message: `Error updating task: ${error.message}` });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await Task.destroy({
      where: {
        id: req.query.taskId,
      },
    });
    if (result) {
      return res.status(200).send({ message: `Task deleted` });
    } else {
      return res
        .status(400)
        .send({ message: `Error deleting task: ${error.message}` });
    }
  } catch (error) {
    res.status(500).send({ message: `Error deleting task: ${error.message}` });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).send({ message: "No tasks found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error getting task: ${error.message}` });
  }
};

exports.getTaskById = async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).send({ message: "Task ID must be a number" });
  }
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).send({ message: "No such task" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error getting task: ${error.message}` });
  }
};

exports.getTasksByProjectId = async (req, res) => {
  if (!req.params.projectId || isNaN(req.params.projectId)) {
    return res
      .status(400)
      .json({ message: `projectId is missing or not a valid number` });
  }
  try {
    const tasks = await Task.findAll({
      where: {
        project_id: req.params.projectId,
        user_id: req.user.id,
      },
    });
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).send({ message: "No tasks found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error getting project's tasks: ${error.message}` });
  }
};

exports.getTasksByUserId = async (req, res) => {
  try {
    const task = await Task.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send({ message: "No tasks found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error getting user's task: ${error.message}` });
  }
};

exports.getTasksByStatus = async (req, res) => {
  try {
    if (
      !req.query.status ||
      typeof req.query.status != "string" ||
      !isNaN(req.query.status)
    ) {
      return res
        .status(400)
        .send({ message: "Task status must be specified or isn't a string" });
    }

    const tasks = await Task.findAll({
      where: {
        status: req.query.status,
        user_id: req.user.id,
      },
    });
    if (tasks[0]) {
      res.status(200).json(tasks);
    } else {
      res.status(404).send({ message: "No tasks found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error getting tasks: ${error.message}` });
  }
};

exports.getProjectTasksByStatus = async (req, res) => {
  try {
    if (
      !req.query.status ||
      !req.query.projectId ||
      typeof req.query.status != "string" ||
      !isNaN(req.query.status) ||
      isNaN(req.query.projectId)
    ) {
      return res
        .status(400)
        .send({ message: "Error or missing in status/project-id parameters" });
    }

    const tasks = await Task.findAll({
      where: {
        project_id: req.query.projectId,
        status: req.query.status,
        user_id: req.user.id,
      },
    });
    if (tasks[0]) {
      res.status(200).json(tasks);
    } else {
      res.status(404).send({ message: "No tasks found" });
    }
  } catch (error) {
    res.status(500).send({ message: `Error getting tasks: ${error.message}` });
  }
};

exports.useTaskTag = async (req, res) => {
  if (
    !req.query.taskId ||
    isNaN(req.query.taskId) ||
    !req.query.tagId ||
    isNaN(req.query.tagId)
  ) {
    return res.status(400).send({
      message: "Task/Tag ID is not supplied or is not a number",
    });
  }
  try {
    const taskTag = await TaskTagRelation.create({
      task_id: req.query.taskId,
      tag_id: req.query.tagId,
    });
    if (taskTag) {
      res.status(200).json(taskTag);
    } else {
      res
        .status(404)
        .send({ message: "Couldn't give the task a tag, check for errors" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error setting task's tag: ${error.message}` });
  }
};

exports.removeTaskTag = async (req, res) => {
  if (
    !req.query.taskId ||
    isNaN(req.query.taskId) ||
    !req.query.tagId ||
    isNaN(req.query.tagId)
  ) {
    return res.status(400).send({
      message: "Task/Tag ID is not supplied or is not a number",
    });
  }
  try {
    const taskTag = await TaskTagRelation.destroy({
      where: {
        task_id: req.query.taskId,
        tag_id: req.query.tagId,
      },
    });
    if (taskTag) {
      res.status(200).send({ message: "Task's tag removed" });
    } else {
      res
        .status(404)
        .send({ message: "Couldn't remove task's tag, check for errors" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error removing task's tag: ${error.message}` });
  }
};
