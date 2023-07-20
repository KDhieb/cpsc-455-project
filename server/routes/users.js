// ChatGPT was used in helping create this file
const express = require('express');
const User = require('../models/user'); // Import your User model
const auth = require('../middleware/auth'); // Assuming you have auth middleware
const router = express.Router();

// Create or retrieve a user
router.post('/signin', auth, async (req, res) => {
  const { email } = req.body;

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
router.get('/:email/playlists', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate('playlists');
    res.json(user.playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
