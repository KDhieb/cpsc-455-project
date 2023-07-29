const axios = require("axios");
const qs = require("qs");

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var flask_url = process.env.REACT_APP_FLASK_SERVER;
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

/**
 * A helper function to get the spotify api headers for making requests
 * @returns spotify api headers
 */
async function getSpotifyHeaders() {
  if (token_store.token == null || token_store.expires < Date.now()) {
    const token = await get_token();
    token_store.token = token.access_token;
    token_store.expires = Date.now() + token.expires_in * 1000;
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${token_store.token}`,
    },
  };
  return headers;
}

/**
 *
 * @param {*} searchString - the current search string
 * @returns song search results
 */
async function search_songs(searchString) {
  try {
    const headers = await getSpotifyHeaders();

    const search_url = `https://api.spotify.com/v1/search?q=${searchString}&type=track&limit=20`;

    const response = await axios.get(search_url, headers);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

/**
 *
 * @param {*} song - spotify song object to get features for
 * @param {*} headers - headers for spotify api request
 * @returns  - spotify song features
 */
async function getTrackFeatures(song, headers) {
  const song_id = song.id;

  const track_features = `https://api.spotify.com/v1/audio-features/${song_id}`;
  track_features_response = await axios.get(track_features, headers);

  const response_data = track_features_response.data;
  const data = {
    acousticness: response_data.acousticness,
    danceability: response_data.danceability,
    energy: response_data.energy,
    instrumentalness: response_data.instrumentalness,
    liveness: response_data.liveness,
    loudness: response_data.loudness,
    speechiness: response_data.speechiness,
    tempo: response_data.tempo,
    valence: response_data.valence,
    popularity: song.popularity ?? 0,
    year: song.album.release_date.split("-")[0] ?? 0,
  };

  return data;
}

/**
 *
 * @param {*} recommended_song_ids - list of spotify song ids
 * @param {*} headers - headers for spotify api request
 * @returns - list of spotify song objects
 */
async function getTracksFromIds(recommended_song_ids, headers) {
  let track_ids_url = "https://api.spotify.com/v1/tracks?ids=";

  let first = true;
  for (const id of recommended_song_ids) {
    track_ids_url += first ? "" : "%2C";
    first = false;
    track_ids_url += id;
  }

  const tracks_response = await axios.get(track_ids_url, headers);
  return tracks_response.data;
}

/**
 *
 * @param {*} song - spotify song object to generate recommendations for
 * @param {*} useCustomMLModel - boolean to toggle use of custom ML model or spotify recommendations api
 * @returns a list of recommended songs
 */
async function generate_recommendations(song, useCustomMLModel) {
  try {
    const song_id = song.id;

    const headers = await getSpotifyHeaders();

    if (useCustomMLModel) {
      const track_features = await getTrackFeatures(song, headers);

      const recommendation_url = flask_url + "/recommend";

      const ml_model_response = await axios.post(
        recommendation_url,
        track_features
      );

      return await getTracksFromIds(ml_model_response.data, headers);
    } else {
      const search_url = `https://api.spotify.com/v1/recommendations?seed_tracks=${song_id}`;
      const response = await axios.get(search_url, headers);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { search_songs, generate_recommendations };
