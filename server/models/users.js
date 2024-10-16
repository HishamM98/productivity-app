const bcrypt = require("bcrypt");
const { bcryptSaltRounds } = require("../config/auth");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
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
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "username",
        validate: {
          isAlphanumeric: true,
          notEmpty: true,
          len: [3, 50],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "email",
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 255],
        },
      },
      first_name: {
        type: DataTypes.STRING(50),
        set(value) {
          this.setDataValue(
            "first_name",
            value[0].toUpperCase() + value.slice(1).toLowerCase()
          );
        },
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: {
            args: ["i"],
            msg: "First name should only contain alphabetical characters.",
          },
          len: [2, 50],
        },
      },
      last_name: {
        type: DataTypes.STRING(50),
        set(value) {
          this.setDataValue(
            "first_name",
            value[0].toUpperCase() + value.slice(1).toLowerCase()
          );
        },
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: {
            args: ["i"],
            msg: "First name should only contain alphabetical characters.",
          },
          len: [2, 50],
        },
      },
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, bcryptSaltRounds);
        },
      },
      sequelize,
      tableName: "users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "username",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
};
