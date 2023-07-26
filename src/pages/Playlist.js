import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SongResults from "../components/SongResults";
import { createSpotifyFormattedSongObject } from "../utils/utils";

function Playlist() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);

  // Consider that a playlist can be accessed by someone not signed in and there has no user object
  // Instead have this make an axios request directly and stored only on this page
  // Reformat the response from the backend such that every song object is in the original Spotify format
  // Feed that reformatted response into SongList

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/playlists/${playlistId}/songs`
        );
        const formattedSongs = response.data.songs.map((song) => {
          return createSpotifyFormattedSongObject(
            song.spotifyId,
            song.songName,
            song.artistName,
            song.albumName,
            song.albumCover,
            song.previewURL,
            `https://open.spotify.com/track/${song.spotifyId}`
          );
        });
        setSongs(formattedSongs);
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
      }
    };

    fetchPlaylistSongs();
  }, [playlistId]);

  return (
    <SongResults
      // TODO: Modify isSearchResults to take an enum with 3 cases searchResults, recommend, and playlist
      //       Change the text for each and if playlist display nothing?
      //       Add a text component displaying response.data.name above the search results
      isSearchResults={true}
      songs={songs}
      handleSongSelect={() => {}}
    />
    // TODO: Add a delete playlist button
  );
}

export default Playlist;
