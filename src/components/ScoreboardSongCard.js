import PlayableAlbumCover from "./PlayableAlbumCover";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";

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
      <TableCell>{song.artist}</TableCell>
      <TableCell>{song.name}</TableCell>
      <TableCell>{song.likes}</TableCell>
    </TableRow>
  );
};
