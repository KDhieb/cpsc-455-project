import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SongResults from "../components/SongResults";
import { createSpotifyFormattedSongObject } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUserPlaylist } from "../slices/userSlice";

function Playlist() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const user = useSelector((state) => state.user.user);

  // Consider that a playlist can be accessed by someone not signed in and there has no user object
  // Instead have this make an axios request directly and stored only on this page
  // Reformat the response from the backend such that every song object is in the original Spotify format
  // Feed that reformatted response into SongList

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenWithPopup } = useAuth0();

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
        setPlaylistName(response.data.name);
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
      }
    };

    fetchPlaylistSongs();
  }, [playlistId, user]);

  const handleDelete = () => {
    dispatch(
      deleteUserPlaylist({
        email: user.email,
        playlistId,
        getAccessTokenWithPopup,
      })
    );

    navigate("/"); // navigate to home route
  };

  return (
    <SongResults
      subtitleText={playlistName}
      songs={songs}
      handleSongSelect={() => {}}
      handleDelete={
        user.playlists.some((playlist) => playlist._id === playlistId)
          ? handleDelete
          : null
      }
    />
  );
}

export default Playlist;
