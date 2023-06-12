require("dotenv").config();

var express = require("express");
const { search_songs } = require("../api");
var router = express.Router();

/* GET song search results . */
router.get("/search/:searchString", async function (req, res, next) {
  const resp = await search_songs(req.params.searchString);
  return res.json(resp);
});

// GET generate song recommendations (maybe make this a PUT to cache the recommendations?)
router.get("/recommendations/generate", function (req, res, next) {
  const songID = req.body.songID;
  // call spotify api for song meta data
  // call ML model for recommendations
  const recommendations = { recommendations: "recommendations" };
  return res.json(recommendations);
});

// GET scoreboard data
router.get("/scoreboard", function (req, res, next) {
  // call database
  const scoreboard = { scoreboard: "scoreboard" };
  return res.json(scoreboard);
});

// GET globally searched songs
router.get("/globallysearched", function (req, res, next) {
  // call database
  const globallysearched = { globallysearched: "globallysearched" };
  return res.json(globallysearched);
});

// GET song liked status
// https://github.com/fingerprintjs/fingerprintjs for generating user session id on client side
router.get("/liked/:useSessionId/:songId", function (req, res, next) {
  const songId = req.params.songId;
  const userSessionId = req.params.userSessionId;
  const isLiked = true;
  // call spotify api
  const songs = {
    songID: songId,
    userSessionId: userSessionId,
    isLiked: isLiked,
  };
  return res.json(songs);
});

// POST new song searched (for globally searched)
router.post("/globallysearched/add", function (req, res, next) {
  const data = {
    songID: req.body.songID,
    songName: req.body.songName,
    artistName: req.body.artistName,
    albumName: req.body.albumName,
    albumImgSrc: req.body.albumImgSrc,
    songPreview: req.body.songPreview,
    location: req.body.location,
  };
  // update database and return status
  return res.status(201).json(data);
});

// PUT update like (for scoreboard)
router.put("/likes/update", function (req, res, next) {
  const songID = req.body.songID;
  const isLiked = req.body.like;
  // update database and return status
  return res.status(201).json({ songID: songID, like: isLiked });
  res.send("respond with a resource");
});

module.exports = router;
