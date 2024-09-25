var DataTypes = require("sequelize").DataTypes;
var _calendar_events = require("./calendar_events");
var _projects = require("./projects");
var _task_tag_relations = require("./task_tag_relations");
var _task_tags = require("./task_tags");
var _tasks = require("./tasks");
var _user_settings = require("./user_settings");
var _users = require("./users");

function initModels(sequelize) {
  var calendar_events = _calendar_events(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var task_tag_relations = _task_tag_relations(sequelize, DataTypes);
  var task_tags = _task_tags(sequelize, DataTypes);
  var tasks = _tasks(sequelize, DataTypes);
  var user_settings = _user_settings(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  task_tags.belongsToMany(tasks, { as: 'task_id_tasks', through: task_tag_relations, foreignKey: "tag_id", otherKey: "task_id" });
  tasks.belongsToMany(task_tags, { as: 'tag_id_task_tags', through: task_tag_relations, foreignKey: "task_id", otherKey: "tag_id" });
  tasks.belongsTo(projects, { as: "project", foreignKey: "project_id"});
  projects.hasMany(tasks, { as: "tasks", foreignKey: "project_id"});
  task_tag_relations.belongsTo(task_tags, { as: "tag", foreignKey: "tag_id"});
  task_tags.hasMany(task_tag_relations, { as: "task_tag_relations", foreignKey: "tag_id"});
  task_tag_relations.belongsTo(tasks, { as: "task", foreignKey: "task_id"});
  tasks.hasMany(task_tag_relations, { as: "task_tag_relations", foreignKey: "task_id"});
  calendar_events.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(calendar_events, { as: "calendar_events", foreignKey: "user_id"});
  projects.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(projects, { as: "projects", foreignKey: "user_id"});
  task_tags.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(task_tags, { as: "task_tags", foreignKey: "user_id"});
  tasks.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(tasks, { as: "tasks", foreignKey: "user_id"});
  user_settings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(user_settings, { as: "user_setting", foreignKey: "user_id"});

  return {
    calendar_events,
    projects,
    task_tag_relations,
    task_tags,
    tasks,
    user_settings,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
