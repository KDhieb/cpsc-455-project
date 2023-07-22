var express = require("express");
var router = express.Router();
const { search_songs, generate_recommendations } = require("../api");
const { Song, LikedSongs } = require("../models/songSchema");
const GloballySearchedSchema = require("../models/globallySearched");
const auth = require("../middleware/auth");

// Create a new song - ChatGPT used in helping create this method
router.post("/", auth, async (req, res) => {
  const { spotifyId } = req.body;

  try {
    let song = await Song.findOne({ spotifyId });
    if (!song) {
      song = new Song(req.body);
      await song.save();
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET song search results . */
router.get("/search/:searchString", async function (req, res, next) {
  const resp = await search_songs(req.params.searchString);
  return res.json(resp);
});

// GET generate song recommendations (maybe make this a PUT to cache the recommendations?)
router.post("/recommendations/generate", async function (req, res, next) {
  const resp = await generate_recommendations(req.body.song, true);
  return res.json(resp);
});

// GET scoreboard data
router.get("/scoreboard", async function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const songsPerPage = 5;

  try {
    const totalSongs = await LikedSongs.countDocuments();
    const totalPages = Math.ceil(totalSongs / songsPerPage);

    const songs = await LikedSongs.find()
      .sort({ likes: -1 }) // Sort by likes in desc order
      .skip((page - 1) * songsPerPage)
      .limit(songsPerPage);

    res.json({ songs, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error getting liked songs" });
  }
});

// GET globally searched songs
router.get("/globallysearched", async function (req, res, next) {
  try {
    const globallySearchedSongs = await GloballySearchedSchema.find()
      .sort({
        createdAt: -1,
      })
      .limit(12);

    return res.json({ globallySearchedSongs });
  } catch (error) {
    res.status(500).json({ message: "Error getting globally searched songs" });
  }
});

// POST new song searched (for globally searched)
router.post("/globallysearched/add", async function (req, res, next) {
  const song = req.body.song;
  const location = req.body.location;

  let globallySearchedSong = new GloballySearchedSchema({
    albumCover: song.album.images[0].url,
    songName: song.name,
    artists: song.artists.map((artist) => ({ name: artist.name })),
    album: {
      name: song.album.name,
      images: song.album.images.map((image) => ({ url: image.url })),
    },
    preview_url: song.preview_url,
    external_urls: {
      spotify: song.external_urls.spotify,
    },
    location: location,
    spotifyId: song.id,
  });

  const data = await globallySearchedSong.save();

  return res.status(201).json(data);
});

// PUT update like (for scoreboard)
router.put("/likes/update", async function (req, res) {
  const { song, isLiked } = req.body;

  try {
    let likedSong = await LikedSongs.findOne({ spotifyId: song.id });
    if (likedSong) {
      isLiked ? likedSong.likes++ : likedSong.likes--;
      await likedSong.save();
    } else {
      likedSong = new LikedSongs({
        albumCover: song.album.images[0].url,
        songName: song.name,
        artistName: song.artists[0].name,
        likes: 1,
        previewURL: song.preview_url,
        spotifyId: song.id,
      });
      await likedSong.save();
    }
    res.status(201).json({ song: likedSong, like: isLiked });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
