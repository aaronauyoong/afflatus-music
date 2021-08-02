// Post and Comment are needed
const Post = require("./Post");
const Comment = require("./Comment");

// User and Playlist may no longer be required as they might be extracted directly from Spotify API
const User = require("./User");
const Playlist = require("./Playlist");

module.exports = { Post, Comment, User, Playlist };
