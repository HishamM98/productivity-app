const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");

const usersRouter = require("./routes/users");
const projectsRouter = require("./routes/projects");
const tasksRouter = require("./routes/tasks");
// const eventsRouter = require("./routes/events");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  await db.sequelize.sync({ force: false });
})();

app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);
// app.use("/events", eventsRouter);

module.exports = app;

// TODO: implement events func
// TODO: implement task tags func
// TODO: retouch endpoints validation
// TODO: check for needed functionality
