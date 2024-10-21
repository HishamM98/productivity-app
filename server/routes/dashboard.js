const router = require("express").Router();
const dashboardController = require("../controllers/dashboard");
const { authenticate } = require("../middlewares/auth");

router.get("/data", authenticate(), dashboardController.getDashboardData);

module.exports = router;
