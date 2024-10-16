const Project = require("../models").models.projects;
const Task = require("../models").models.tasks;

class StatusManager {
  async updateProjectStatus(projectId) {
    const project = await Project.findByPk(projectId, { include: Task });
    const now = new Date();

    if (now < project.start_date) {
      project.status = "Not Started";
    } else if (now > project.end_date) {
      project.status = "Completed";
    } else {
      const inProgressTasks = project.Tasks.filter(
        (task) => task.status === "In Progress"
      );
      project.status =
        inProgressTasks.length > 0 ? "In Progress" : "Not Started";
    }

    await project.save();
  }

  async updateTaskStatus(taskId) {
    const task = await Task.findByPk(taskId);
    const now = new Date();

    if (now < task.due_date && task.status !== "In Progress") {
      task.status = "To Do";
    } else if (now >= task.due_date && task.status !== "Completed") {
      task.status = "Overdue";
    }

    await task.save();
  }
}

Project.afterUpdate(async (project) => {
  const statusManager = new StatusManager();
  await statusManager.updateProjectStatus(project.id);
});

Task.afterUpdate(async (task) => {
  const statusManager = new StatusManager();
  await statusManager.updateTaskStatus(task.id);
});

module.exports = StatusManager;
