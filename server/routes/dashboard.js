const router = require("express").Router();
const dashboardController = require("../controllers/dashboard");

router.get("/dashboard-data/:userId", dashboardController.getDashboardData);

module.exports = router;
