require("dotenv").config();

module.exports = {
  host: "localhost",
  port: 3306,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASS,
  database: process.env.MY_SQL_DB,
  dialect: "mysql",
};
