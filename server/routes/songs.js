var express = require("express");
var router = express.Router();
const { search_songs, generate_recommendations } = require("../api");

// todo: to be replaced by db
const globallySearchedSongs = {};

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

// GET globally searched songs
router.get("/globallysearched", function (req, res, next) {
  // call database
  // const globallysearched = { globallysearched: "globallysearched" };
  // todo can probably find a better algorithm, though with the db we won't need this
  // todo I'm fully brute forcing here
  const result = [];

  for (const location in globallySearchedSongs) {
    const songs = globallySearchedSongs[location];
    let maxCount = 0;
    let maxCountID = "";

    for (const songID in songs) {
      const song = songs[songID];
      if (song.count > maxCount) {
        maxCount = song.count;
        maxCountID = songID;
      }
    }
    result.push(songs[maxCountID])
  }

  return res.json(result)

  // return res.json(globallySearchedSongs);
});

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
  // todo will just insert this data into db later along with count instead of doing this
  let songID = song.id;
  if (!globallySearchedSongs.hasOwnProperty(location)) {
    globallySearchedSongs[location] = {};
  }
  if (!globallySearchedSongs[location].hasOwnProperty(songID)) {
    data["count"] = 1;
    globallySearchedSongs[location][songID] = data;
  } else {
    globallySearchedSongs[location][songID].count++;
  }

  // globallySearchedSongs.push(data);

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
