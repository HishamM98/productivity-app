module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "projects",
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
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "name",
        validate: {
          notEmpty: true,
          len: [3, 100],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
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
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
        allowNull: true,
        defaultValue: "Not Started",
        validate: {
          isIn: [["Not Started", "In Progress", "Completed"]],
        },
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          dateValidator(value) {
            if (new Date(value) <= Date.now()) {
              throw new Error("`End Date` can't be a date in the past!");
            }
            if (new Date(value) <= new Date(this.start_date)) {
              throw new Error("`End Date` can't be before `Start Date`!");
            }
          },
        },
      },
    },
    {
      sequelize,
      tableName: "projects",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "idx_projects_user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
