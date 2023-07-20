// ChatGPT was used in helping create this file
const express = require('express');
const Playlist = require('../models/playlist'); // Import your Playlist model
const auth = require('../middleware/auth'); // Assuming you have auth middleware
const router = express.Router();

// Create a playlist
router.post('/', auth, async (req, res) => {
    const playlist = new Playlist(req.body);
    try {
        await playlist.save();
        res.status(201).send(playlist);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Add a song to a playlist
router.put('/:playlistId', auth, async (req, res) => {
    const playlist = await Playlist.findById(req.params.playlistId);
    playlist.songs.push(req.body.songId);
    await playlist.save();
    res.send(playlist);
});

// Get a playlist's songs
router.get('/:playlistId/songs', async (req, res) => {
    const playlist = await Playlist.findById(req.params.playlistId).populate('songs');
    res.send(playlist.songs);
});

module.exports = router;
