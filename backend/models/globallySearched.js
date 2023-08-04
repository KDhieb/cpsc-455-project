const mongoose = require("mongoose");
const globallySearchedSchema = new mongoose.Schema(
  {
    albumCover: {
      type: String,
      required: true,
    },
    songName: {
      type: String,
      required: true,
    },
    artists: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    album: {
      name: {
        type: String,
        required: true,
      },
      images: [
        {
          url: {
            type: String,
            required: true,
          },
        },
      ],
    },
    preview_url: {
      type: String,
    },
    external_urls: {
      spotify: {
        type: String,
        required: true,
      },
    },
    location: {
      type: String,
      required: true,
    },
    spotifyId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const GloballySearched = mongoose.model(
  "globallySearchedSongs",
  globallySearchedSchema
);
module.exports = GloballySearched;
