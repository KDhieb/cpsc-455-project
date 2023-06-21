var express = require("express");
var router = express.Router();
const { search_songs, generate_recommendations } = require("../api");

// todo remove when we seed the db with the proper # of songs
let globallySearchedSongs = [
  {
    "songID": "11xC6P3iKYpFThT6Ce1KdG",
    "songName": "Attention",
    "artistName": "Doja Cat",
    "albumName": "Attention",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b27324b893fb9e7953ebc9517c6a",
    "songPreview": "https://p.scdn.co/mp3-preview/0bc92811cc92e03805da4a1a5e8d70a0dee73107?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "location": "Vancouver"
  },
  {
    "songID": "5xP9lQYA8YQmQh6BOxcAnR",
    "songName": "Popular (with Playboi Carti & Madonna) - The Idol Vol. 1 (Music from the HBO Original Series)",
    "artistName": "The Weeknd",
    "albumName": "Popular [The Idol Vol. 1 (Music from the HBO Original Series)]",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b273eac1ac267dc90bc625535a57",
    "songPreview": null,
    "location": "Vancouver"
  },
  {
    "songID": "0yLdNVWF3Srea0uzk55zFn",
    "songName": "Flowers",
    "artistName": "Miley Cyrus",
    "albumName": "Flowers",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d",
    "songPreview": "https://p.scdn.co/mp3-preview/9fbe346e805ed219204f53324f94557ab557b6d3?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "location": "Vancouver"
  },
  {
    "songID": "5rurggqwwudn9clMdcchxT",
    "songName": "Calling (Spider-Man: Across the Spider-Verse) (Metro Boomin & Swae Lee, NAV, feat. A Boogie Wit da Hoodie)",
    "artistName": "Metro Boomin",
    "albumName": "METRO BOOMIN PRESENTS SPIDER-MAN: ACROSS THE SPIDER-VERSE (SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE)",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b2736ed9aef791159496b286179f",
    "songPreview": null,
    "location": "Vancouver"
  },
  {
    "songID": "1vYXt7VSjH9JIM5oRRo7vA",
    "songName": "Dance The Night (From Barbie The Album)",
    "artistName": "Dua Lipa",
    "albumName": "Dance The Night (From Barbie The Album)",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b2737dd3ba455ee3390cb55b0192",
    "songPreview": "https://p.scdn.co/mp3-preview/acaea048f50a3b30ca24b348c84a6047373baabb?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "location": "Vancouver"
  },
  {
    "songID": "1Qrg8KqiBpW07V7PNxwwwL",
    "songName": "Kill Bill",
    "artistName": "SZA",
    "albumName": "SOS",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b2730c471c36970b9406233842a5",
    "songPreview": "https://p.scdn.co/mp3-preview/4bd2dc84016f3743add7eea8b988407b1b900672?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "location": "Vancouver"
  },
  {
    "songID": "7KokYm8cMIXCsGVmUvKtqf",
    "songName": "Karma",
    "artistName": "Taylor Swift",
    "albumName": "Midnights",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
    "songPreview": null,
    "location": "Vancouver"
  },
  {
    "songID": "7FbrGaHYVDmfr7KoLIZnQ7",
    "songName": "Cupid - Twin Ver.",
    "artistName": "FIFTY FIFTY",
    "albumName": "The Beginning: Cupid",
    "albumImgSrc": "https://i.scdn.co/image/ab67616d0000b27337c0b3670236c067c8e8bbcb",
    "songPreview": "https://p.scdn.co/mp3-preview/af5c16d4c69be9b3278e7079d5aab14aa425127b?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "location": "Vancouver"
  }
]

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

  return res.json(globallySearchedSongs);
});

// POST new song searched (for globally searched)
router.post("/globallysearched/add", function (req, res, next) {
  const song = req.body.song;
  const location = req.body.location;
  const limit = 8;

  const data = {
    songID: song.id,
    songName: song.name,
    artistName: song.artists[0].name,
    albumName: song.album.name,
    albumImgSrc: song.album.images[0].url,
    songPreview: song.preview_url,
    location: location,
  };

  const songID = song.id;

  if (globallySearchedSongs.filter(e => e.songID === songID).length === 0) {
    globallySearchedSongs.push(data);
  }

  if (globallySearchedSongs.length > limit) {
    globallySearchedSongs.shift()
  }

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
