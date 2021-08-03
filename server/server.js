const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

// Import the ApolloServer class
const { ApolloServer } = require("apollo-server-express");

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// To prevent CORS errors
app.use(cors());

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Update Express.js to use Apollo server features
server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Start the API server
// app.listen(PORT, () =>
// 	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
// );

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
