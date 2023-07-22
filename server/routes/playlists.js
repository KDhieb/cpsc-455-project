// ChatGPT was used in helping create this file
const express = require("express");
const Playlist = require("../models/playlistSchema");
const { Song } = require("../models/songSchema");
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
router.post("/:playlistId", auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // Check if the song already exists in the playlist
    if (!playlist.songs.includes(req.body.songId)) {
      playlist.songs.push(req.body.songId);
      await playlist.save();
    }

    const song = await Song.findById(req.body.songId);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.send(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a playlist's songs
router.get("/:playlistId/songs", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId).populate(
      "songs"
    );

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    res.send(playlist.songs); // TODO: Decide to send back to the whole playlist and not just songs?
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

    res.status(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
