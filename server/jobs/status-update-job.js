const cron = require("node-cron");
const Project = require("../models").models.projects;
const Task = require("../models").models.tasks;
const StatusManager = require("../services/StatusManager");

const statusUpdateJob = () => {
  cron.schedule("0 0 * * *", async () => {
    const statusManager = new StatusManager();
    const projects = await Project.findAll();
    const tasks = await Task.findAll();

    for (const project of projects) {
      await statusManager.updateProjectStatus(project.id);
    }

    for (const task of tasks) {
      await statusManager.updateTaskStatus(task.id);
    }

    console.log("Status update job completed");
  });
};

module.exports = statusUpdateJob;
