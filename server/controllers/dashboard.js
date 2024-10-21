const { Sequelize, Op } = require("sequelize");
const models = require("../models").models;

exports.getDashboardData = async (req, res) => {
  try {
    const dashboardData = {};
    dashboardData.userProjectsCount = await models.projects.count({
      where: {
        user_id: req.user.id,
      },
    });

    dashboardData.userTasksCount = await models.tasks.count({
      where: {
        user_id: req.user.id,
      },
    });

    dashboardData.userTasksStatusCount = await models.tasks.count({
      group: "status",
      attributes: ["status"],
      where: {
        user_id: req.user.id,
      },
    });

    dashboardData.userProjectsStatusCount = await models.projects.count({
      group: "status",
      attributes: ["status"],
      where: {
        user_id: req.user.id,
      },
    });

    dashboardData.userProjectsDeadlineCount = await models.projects.count({
      where: {
        user_id: req.user.id,
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
        user_id: req.user.id,
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
      return res.json(dashboardData);
    } else {
      return res.status(404).json({ message: "Error getting dashboard data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
