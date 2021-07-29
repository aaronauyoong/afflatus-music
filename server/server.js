const express = require("express");
const app = express();

// Configure body parsing for AJAX requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to Mongo DB



