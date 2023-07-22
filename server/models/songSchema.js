const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  albumCover: {
    type: String,
    required: true,
  },
  songName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  previewURL: {
    type: String,
  },
  spotifyId: {
    type: String,
    required: true,
  },
});

const LikedSongs = mongoose.model("LikedSongs", SongSchema);
const Song = mongoose.model("Song", SongSchema);

module.exports = { Song, LikedSongs };
