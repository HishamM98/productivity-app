const router = require("express").Router();

const authRouter = require("./auth");
const dashboardRouter = require("./dashboard");
const usersRouter = require("./users");
const projectsRouter = require("./projects");
const tasksRouter = require("./tasks");
// const eventsRouter = require("../routes/events");

router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/users", usersRouter);
router.use("/projects", projectsRouter);
router.use("/tasks", tasksRouter);
// router.use("/events", eventsRouter);

module.exports = router;
