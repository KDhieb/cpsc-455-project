import PlayableAlbumCover from "./PlayableAlbumCover";
import { TableCell, TableRow } from "@material-ui/core";

export const ScoreboardSongCard = ({ song, ranking }) => {
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
