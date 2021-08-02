const express = require('express');
const router = express.Router();
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);

module.exports = router;
