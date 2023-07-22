const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const Playlists = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlists;
