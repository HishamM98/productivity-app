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
        validate: {
          isInt: true,
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 255],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [3, 500],
        },
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
        validate: {
          isDate: true,
          isAfter: Sequelize.fn("CURRENT_DATE"),
        },
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
