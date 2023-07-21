// ChatGPT was used in helping create this file
const express = require("express");
const User = require("../models/userSchema");
const auth = require("../middleware/auth");
const router = express.Router();

// Create or retrieve a user
router.post("/signin", auth, async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all playlists for a user
router.get("/:email/playlists", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate("playlists");
    res.json(user.playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a playlist to a user
router.post("/:email/playlists", auth, async (req, res) => {
  const { email } = req.params;
  const { playlistId } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.playlists.push(playlistId);
    await user.save();

    res.json(user.playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a playlist from a user
router.delete("/:email/playlists", auth, async (req, res) => {
  const { email } = req.params;
  const { playlistId } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.playlists.pull(playlistId);
    await user.save();

    res.json(user.playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
