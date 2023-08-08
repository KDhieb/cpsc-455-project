require("./db/mongoose");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var usersRouter = require("./routes/users");
var songsRouter = require("./routes/songs");
var playlistsRouter = require("./routes/playlists");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/songs", songsRouter);
app.use("/playlists", playlistsRouter);

module.exports = app;
