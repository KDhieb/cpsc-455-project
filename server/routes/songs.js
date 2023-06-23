var express = require("express");
var router = express.Router();
const { search_songs, generate_recommendations } = require("../api");
const LikedSongs = require("../models/likedSongs");

// todo remove when we seed the db with the proper # of songs
let globallySearchedSongs = [
  {
    "id": "11xC6P3iKYpFThT6Ce1KdG",
    "name": "Attention",
    "artists": [
      {
        "name": "Doja Cat"
      }
    ],
    "album": {
      "name": "Attention",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b27324b893fb9e7953ebc9517c6a"
        }
      ]
    },
    "preview_url": "https://p.scdn.co/mp3-preview/0bc92811cc92e03805da4a1a5e8d70a0dee73107?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "external_urls": {
      "spotify": "https://open.spotify.com/track/11xC6P3iKYpFThT6Ce1KdG"
    },
    "location": "Vancouver"
  },
  {
    "id": "5xP9lQYA8YQmQh6BOxcAnR",
    "name": "Popular (with Playboi Carti & Madonna) - The Idol Vol. 1 (Music from the HBO Original Series)",
    "artists": [
      {
        "name": "The Weeknd"
      }
    ],
    "album": {
      "name": "Popular [The Idol Vol. 1 (Music from the HBO Original Series)]",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b273eac1ac267dc90bc625535a57"
        }
      ]
    },
    "preview_url": null,
    "external_urls": {
      "spotify": "https://open.spotify.com/track/5xP9lQYA8YQmQh6BOxcAnR"
    },
    "location": "Vancouver"
  },
  {
    "id": "5rurggqwwudn9clMdcchxT",
    "name": "Calling (Spider-Man: Across the Spider-Verse) (Metro Boomin & Swae Lee, NAV, feat. A Boogie Wit da Hoodie)",
    "artists": [
      {
        "name": "Metro Boomin"
      }
    ],
    "album": {
      "name": "METRO BOOMIN PRESENTS SPIDER-MAN: ACROSS THE SPIDER-VERSE (SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE)",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b2736ed9aef791159496b286179f"
        }
      ]
    },
    "preview_url": null,
    "external_urls": {
      "spotify": "https://open.spotify.com/track/5rurggqwwudn9clMdcchxT"
    },
    "location": "Vancouver"
  },
  {
    "id": "1vYXt7VSjH9JIM5oRRo7vA",
    "name": "Dance The Night (From Barbie The Album)",
    "artists": [
      {
        "name": "Dua Lipa"
      }
    ],
    "album": {
      "name": "Dance The Night (From Barbie The Album)",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b2737dd3ba455ee3390cb55b0192"
        }
      ]
    },
    "preview_url": "https://p.scdn.co/mp3-preview/acaea048f50a3b30ca24b348c84a6047373baabb?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "external_urls": {
      "spotify": "https://open.spotify.com/track/1vYXt7VSjH9JIM5oRRo7vA"
    },
    "location": "Vancouver"
  },
  {
    "id": "7FbrGaHYVDmfr7KoLIZnQ7",
    "name": "Cupid - Twin Ver.",
    "artists": [
      {
        "name": "FIFTY FIFTY"
      }
    ],
    "album": {
      "name": "The Beginning: Cupid",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b27337c0b3670236c067c8e8bbcb"
        }
      ]
    },
    "preview_url": "https://p.scdn.co/mp3-preview/af5c16d4c69be9b3278e7079d5aab14aa425127b?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "external_urls": {
      "spotify": "https://open.spotify.com/track/7FbrGaHYVDmfr7KoLIZnQ7"
    },
    "location": "Vancouver"
  },
  {
    "id": "7KokYm8cMIXCsGVmUvKtqf",
    "name": "Karma",
    "artists": [
      {
        "name": "Taylor Swift"
      }
    ],
    "album": {
      "name": "Midnights",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5"
        }
      ]
    },
    "preview_url": null,
    "external_urls": {
      "spotify": "https://open.spotify.com/track/7KokYm8cMIXCsGVmUvKtqf"
    },
    "location": "Vancouver"
  },
  {
    "id": "0yLdNVWF3Srea0uzk55zFn",
    "name": "Flowers",
    "artists": [
      {
        "name": "Miley Cyrus"
      }
    ],
    "album": {
      "name": "Flowers",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d"
        }
      ]
    },
    "preview_url": "https://p.scdn.co/mp3-preview/9fbe346e805ed219204f53324f94557ab557b6d3?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "external_urls": {
      "spotify": "https://open.spotify.com/track/0yLdNVWF3Srea0uzk55zFn"
    },
    "location": "Vancouver"
  },
  {
    "id": "1Qrg8KqiBpW07V7PNxwwwL",
    "name": "Kill Bill",
    "artists": [
      {
        "name": "SZA"
      }
    ],
    "album": {
      "name": "SOS",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b2730c471c36970b9406233842a5"
        }
      ]
    },
    "preview_url": "https://p.scdn.co/mp3-preview/4bd2dc84016f3743add7eea8b988407b1b900672?cid=07f17a9780d34fc5aac6cb73f0ca6ce8",
    "external_urls": {
      "spotify": "https://open.spotify.com/track/1Qrg8KqiBpW07V7PNxwwwL"
    },
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
    res.status(500).json({ message: 'Error getting liked songs' });
  }
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

  // const data = {
  //   id: song.id,
  //   name: song.name,
  //   artists: song.artists[0].name,
  //   albumName: song.album.name,
  //   albumImgSrc: song.album.images[0].url,
  //   songPreview: song.preview_url,
  //   externalUrl: song.external_urls.spotify,
  //   location: location,
  // };

  const data = {
    id: song.id,
    name: song.name,
    artists: [{name: song.artists[0].name}],
    album: {
      name: song.album.name,
      images: [{url: song.album.images[0].url}]
    },
    preview_url: song.preview_url,
    external_urls: {
      spotify: song.external_urls.spotify
    },
    location: location
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
        spotifyId: song.id
      });
      await likedSong.save();
    }
    res.status(201).json({ song: likedSong, like: isLiked })
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;