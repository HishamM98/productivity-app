const statusUpdateJob = require("./status-update-job");

const initJobs = () => {
  statusUpdateJob();
};

module.exports = initJobs;
