import PlayableAlbumCover from "./PlayableAlbumCover";
import { TableCell, TableRow } from "@material-ui/core";
import { useRef, useState } from "react";
import SongPopupView from "./SongPopupView";
import {createSpotifyFormattedSongObject} from "../utils/utils";

export const ScoreboardSongCard = ({ song, ranking }) => {
  const albumClickedRef = useRef(false);

  const [displayPopup, setDisplayPopup] = useState(false);

  const handlePopupClose = () => {
    setDisplayPopup(false);
  }

  const handleClick = () => {
    if (albumClickedRef.current) {
      albumClickedRef.current = false;
    } else {
      setDisplayPopup(true);
    }
  }

  const handleAlbumClicked = () => {
    albumClickedRef.current = true;
  }

  const songObject = createSpotifyFormattedSongObject(song.spotifyId, song.songName, song.artistName, song.albumName, song.albumCover, song.previewURL, null);

  return (
  <>
    <TableRow onClick={handleClick} hover={true} >
      <TableCell>{ranking}</TableCell>
      <TableCell>
        <PlayableAlbumCover
          url={song.previewURL}
          img={song.albumCover}
          mini={false}
          size={110}
          albumClickedCallback={handleAlbumClicked}
        />
      </TableCell>
      <TableCell>{song.songName}</TableCell>
      <TableCell>{song.artistName}</TableCell>
      <TableCell>{song.likes}</TableCell>
    </TableRow>
    <SongPopupView song={songObject} isDisplayed={displayPopup} handleClose={handlePopupClose}
     />
    </>
  );
};
