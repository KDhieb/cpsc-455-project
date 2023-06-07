import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import { SCOREBOARD_HEADERS } from "../constants/constants";
import { scoreboardTestData } from "../assets/data/scoreboardTestData";
import { ScoreboardSongCard } from "../components/ScoreboardSongCard";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 1000,
    margin: "auto",
    marginTop: 50,
  },
  boldHeader: {
    fontWeight: "bold",
  },
});

export const Scoreboard = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.boldHeader}>
                {SCOREBOARD_HEADERS.ranking}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.boldHeader}>
                {SCOREBOARD_HEADERS.album}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.boldHeader}>
                {SCOREBOARD_HEADERS.nameArtist}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.boldHeader}>
                {SCOREBOARD_HEADERS.likes}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreboardTestData.map((song, index) => {
            return (
              <ScoreboardSongCard song={song} key={index} ranking={index + 1} />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
