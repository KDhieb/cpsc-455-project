var express = require("express");
var router = express.Router();
const { search_songs, generate_recommendations } = require("../api");

/* GET song search results . */
router.get("/search/:searchString", async function (req, res, next) {
  const resp = await search_songs(req.params.searchString);
  return res.json(resp);
});

// GET generate song recommendations (maybe make this a PUT to cache the recommendations?)
router.get(
  "/recommendations/generate/:songId",
  async function (req, res, next) {
    const resp = await generate_recommendations(req.params.songId, true); // todo - change to false when ML model is implemented
    return res.json(resp);
  }
);

// todo
// GET scoreboard data
router.get("/scoreboard", function (req, res, next) {
  // call database
  const scoreboard = { scoreboard: "scoreboard" };
  return res.json(scoreboard);
});

// todo
// GET globally searched songs
router.get("/globallysearched", function (req, res, next) {
  // call database
  const globallysearched = { globallysearched: "globallysearched" };
  return res.json(globallysearched);
});

// todo
// POST new song searched (for globally searched)
router.post("/globallysearched/add", function (req, res, next) {
  const song = req.body.song;
  const location = req.body.location;

  const data = {
    songID: song.id,
    songName: song.name,
    artistName: song.artists[0].name,
    albumName: song.album.name,
    albumImgSrc: song.album.images[0].url,
    songPreview: song.preview_url,
    location: location,
  };
  // update database
  return res.status(201).json(data);
});

// todo
// PUT update like (for scoreboard)
router.put("/likes/update", function (req, res, next) {
  const songID = req.body.songID;
  const isLiked = req.body.isLiked;
  // update database
  return res.status(201).json({ songID: songID, like: isLiked });
});

module.exports = router;
