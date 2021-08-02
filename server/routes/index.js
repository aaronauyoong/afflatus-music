const express = require('express');
const router = express.Router();
const homeRoutes = require("./homeRoutes");

// Link to defined routes
router.use("/", homeRoutes);

module.exports = router;
