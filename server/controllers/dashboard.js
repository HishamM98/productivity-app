const { Sequelize, Op } = require("sequelize");
const models = require("../models").models;

exports.getDashboardData = async (req, res) => {
  if (!req.params.userId || isNaN(req.params.userId)) {
    return res
      .status(400)
      .send({ message: "User ID is missing or not a number" });
  }
  try {
    const dashboardData = {};
    dashboardData.userProjectsCount = await models.projects.count({
      where: {
        user_id: req.params.userId,
      },
    });

    dashboardData.userTasksCount = await models.tasks.count({
      where: {
        user_id: req.params.userId,
      },
    });

    dashboardData.userTasksStatusCount = await models.tasks.count({
      group: "status",
      attributes: ["status"],
      where: {
        user_id: req.params.userId,
      },
    });

    dashboardData.userProjectsStatusCount = await models.projects.count({
      group: "status",
      attributes: ["status"],
      where: {
        user_id: req.params.userId,
      },
    });

    dashboardData.userProjectsDeadlineCount = await models.projects.count({
      where: {
        user_id: req.params.userId,
        end_date: {
          [Op.and]: [
            { [Op.gte]: Sequelize.fn("CURDATE") },
            {
              [Op.lt]: Sequelize.literal(
                "DATE_ADD(CURDATE(), INTERVAL 10 DAY)"
              ),
            },
          ],
        },
      },
    });

    dashboardData.userTasksDeadlineCount = await models.tasks.count({
      where: {
        user_id: req.params.userId,
        due_date: {
          [Op.and]: [
            { [Op.gte]: Sequelize.fn("CURDATE") },
            {
              [Op.lt]: Sequelize.literal(
                "DATE_ADD(CURDATE(), INTERVAL 10 DAY)"
              ),
            },
          ],
        },
      },
    });

    if (dashboardData) {
      res.json(dashboardData);
    } else {
      res.status(404).json({ message: "Error getting dashboard data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//count user tasks
//count pending tasks
//count in progress tasks
//count done tasks
//count ongoing projects
//count completed projects
//count upcoming project deadlines
//count upcoming task deadlines
