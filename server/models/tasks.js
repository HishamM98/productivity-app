const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tasks",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "projects",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("To Do", "In Progress", "Done"),
        allowNull: true,
        defaultValue: "To Do",
      },
      priority: {
        type: DataTypes.ENUM("Low", "Medium", "High"),
        allowNull: true,
        defaultValue: "Medium",
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tasks",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "idx_tasks_user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "idx_tasks_project_id",
          using: "BTREE",
          fields: [{ name: "project_id" }],
        },
      ],
    }
  );
};
