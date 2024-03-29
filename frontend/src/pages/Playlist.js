import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SongResults from "../components/SongResults";
import { createSpotifyFormattedSongObject } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteUserPlaylist } from "../slices/userSlice";

var backend_url = process.env.REACT_APP_BACKEND_SERVER;

function Playlist() {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let token_type = process.env.REACT_APP_AUTH0_TOKEN_TYPE;
  const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await axios.get(
          backend_url + `/playlists/${playlistId}/songs`
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
    if (token_type === "getAccessTokenWithPopup") {
      dispatch(
        deleteUserPlaylist({
          email: user.email,
          playlistId,
          playlistName,
          getAccessTokenWithPopup,
        })
      );
    } else {
      dispatch(
        deleteUserPlaylist({
          email: user.email,
          playlistId,
          playlistName,
          getAccessTokenSilently,
        })
      );
    }

    navigate("/"); // navigate to home route
  };

  const createDeleteHandler = () => {
    if (user) {
      if (user.playlists.some((playlist) => playlist._id === playlistId)) {
        return handleDelete;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <SongResults
      subtitleText={playlistName}
      songs={songs}
      handleSongSelect={() => {}}
      handleDelete={createDeleteHandler()}
    />
  );
}

export default Playlist;
