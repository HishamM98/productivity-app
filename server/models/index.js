const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");
const initModels = require("./init-models.js");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const db = {};

db.sequelize = sequelize;

db.models = initModels(sequelize);
// db.models.users = require("../models/user.js")(sequelize, DataTypes);
// db.models.projects = require("../models/project.js")(sequelize, DataTypes);
// db.models.tasks = require("../models/task.js")(sequelize, DataTypes);
// db.models.events = require("../models/event.js")(sequelize, DataTypes);

module.exports = db;
