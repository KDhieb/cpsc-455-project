
import "../styling/scoreboardSongCard.css";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";
import { IMAGE_ALTS } from "../constants/constants";

const useStyles = makeStyles({
  img: {
    width: 150,
    height: 150,
  },
});

export const ScoreboardSongCard = ({ song, ranking }) => {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>{ranking}</TableCell>
      <TableCell>
        <PlayableAlbumCover
          url={song.preview_url}
          img={song.albumCoverImg}
          mini={false}
        />
      </TableCell>
      <TableCell>
        {song.name} - {song.artist}
      </TableCell>
      <TableCell>{song.likes}</TableCell>
    </TableRow>
  );
};
