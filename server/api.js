// import axios from "axios";
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var token_store = { token: null, expires: null };

async function get_token() {
  const token_url = "https://accounts.spotify.com/api/token";

  const data = qs.stringify({ grant_type: "client_credentials" });

  const headers = {
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(token_url, data, headers);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

async function search_songs(searchString) {
  try {
    if (token_store.token == null || token_store.expires < Date.now()) {
      const token = await get_token();
      token_store.token = token.access_token;
      token_store.expires = Date.now() + token.expires_in * 1000;
    }

    const search_url = `https://api.spotify.com/v1/search?q=${searchString}&type=track&limit=20`;

    const headers = {
      headers: {
        Authorization: `Bearer ${token_store.token}`,
      },
    };

    const response = await axios.get(search_url, headers);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

module.exports = { search_songs };
