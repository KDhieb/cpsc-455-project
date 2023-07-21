// ChatGPT was used in helping create this file
const express = require("express");
const Playlist = require("../models/playlistSchema");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a playlist
router.post("/", auth, async (req, res) => {
  const playlist = new Playlist(req.body);
  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Add a song to a playlist
router.put("/:playlistId", auth, async (req, res) => {
  const playlist = await Playlist.findById(req.params.playlistId);
  playlist.songs.push(req.body.songId);
  await playlist.save();
  res.send(playlist);
});

// Get a playlist's songs
router.get("/:playlistId/songs", async (req, res) => {
  const playlist = await Playlist.findById(req.params.playlistId).populate(
    "songs"
  );
  res.send(playlist.songs);
});

// Remove a song from a playlist
router.delete("/:playlistId/songs", auth, async (req, res) => {
  const { playlistId } = req.params;
  const { spotifyId } = req.body; // Receiving Spotify ID instead of songId

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    const songIndex = playlist.songs.findIndex(
      (song) => song.spotifyId === spotifyId
    );

    if (songIndex === -1) {
      return res
        .status(404)
        .json({ message: "Song not found in the playlist" });
    }

    playlist.songs.splice(songIndex, 1);
    await playlist.save();

    res.json(playlist.songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
