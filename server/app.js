const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");
const initJobs = require("./jobs");
const { initialize } = require("./middlewares/auth");

const apiRouter = require("./routes");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  await db.sequelize.sync({ force: false });
  initJobs();
})();

app.use("/api/v1", apiRouter);

module.exports = app;

// TODO: implement events func
// TODO: implement task tags func
// TODO: retouch endpoints validation
// TODO: check for needed functionality
