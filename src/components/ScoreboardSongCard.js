import PlayableAlbumCover from "./PlayableAlbumCover";
import { TableCell, TableRow } from "@material-ui/core";

export const ScoreboardSongCard = ({ song, ranking }) => {
  return (
    <TableRow>
      <TableCell>{ranking}</TableCell>
      <TableCell>
        <PlayableAlbumCover
          url={song.previewURL}
          img={song.albumCover}
          mini={false}
        />
      </TableCell>
      <TableCell>{song.songName}</TableCell>
      <TableCell>{song.artisName}</TableCell>
      <TableCell>{song.likes}</TableCell>
    </TableRow>
  );
};
