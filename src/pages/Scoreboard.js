import React, { useEffect, useState } from "react";
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
  Container,
  Pagination,
} from "@mui/material";
import { SCOREBOARD_HEADERS } from "../constants/constants";
import { ScoreboardSongCard } from "../components/ScoreboardSongCard";
import axios from 'axios';

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 1000,
    margin: "auto",
    marginTop: 50,
  },
  boldHeader: {
    fontWeight: "bold",
    color: "white"
  },
  scoreboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
    '& .MuiPagination-ul': {
      '& li': {
        '& a, & button': {
          fontSize: '1.6rem',
          color: 'rgb(17,41,62)',
        },
      },
    },
    width: '100%'
  },
});

export const Scoreboard = () => {
  const classes = useStyles();
  const [scoreboardData, setScoreboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    axios.get(`http://localhost:5000/songs/scoreboard?page=${currentPage}`).then((response) => {
      const { songs, totalPages } = response.data;
      setTotalPages(totalPages);
      setScoreboardData(songs);
    })
  }, [currentPage])

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container className={classes.scoreboardContainer}>
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
                  {SCOREBOARD_HEADERS.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.boldHeader}>
                  {SCOREBOARD_HEADERS.artist}
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
            {scoreboardData.map((song, index) => {
              return (
                <ScoreboardSongCard song={song} key={index} ranking={((currentPage - 1) * 5) + index + 1} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Container>
        <Pagination 
          className={classes.pagination} 
          variant="outlined" 
          shape="rounded" 
          color="primary" 
          count={totalPages} 
          page={currentPage} 
          onChange={handleChange} 
        />
      </Container>
    </Container>
  );
};
