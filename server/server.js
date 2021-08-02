const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const routes = require("./routes");


const app = express();
require("dotenv").config();

// To prevent CORS errors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 3001;

// Connection to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/afflatusmusic", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

// Start the API server
app.listen(PORT, () =>
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
