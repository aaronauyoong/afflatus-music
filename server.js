const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const spotifyRoutes = require("./routes/spotifyRoutes");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors);
// using spotifyRoutes to retrieve data from SpotifyAPI
app.use(spotifyRoutes);

if (process.env.NODE_ENV === "production") {
	console.log("serving static assets")
	app.use(express.static(path.join(__dirname, "client", "build")));
}

app.get("/*", (_, res) => {
	res.sendFile(path.join(__dirname, "client", "build" , "index.html"));
});

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
