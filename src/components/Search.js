import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { songSearch } from "../slices/songSearchSlice";
import SearchIcon from "@mui/icons-material/Search";
import SongResults from "./SongResults";
import sampleSongs from "../sample/sample";

function Search() {
  const [songName, setSongName] = useState("");
  const dispatch = useDispatch();

  const [isSearchResults, setIsSearchResults] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [songResults, setSongResults] = useState([]);

  const songs = sampleSongs.tracks.items;

  const handleSearch = (e) => {
    setSongName(e.target.value);
    if (isSearchResults) {
      if (e.target.value === "") {
        setDisplayResults(false);
      } else {
        // todo call api here to fetch songs
        setDisplayResults(true);
        setSongResults(songs);
      }
    } else {
    }
  };

  const handleClickSearch = () => {
    if (songName === "") {
      setDisplayResults(false);
    } else {
      dispatch(songSearch(songName)); // decide if we want to use redux or not
      // call search api again - edge case: searching after recommendation results have been displayed
      setIsSearchResults(true);
    }
  };

  const handleSongSelect = (song) => {
    setIsSearchResults(false);
    alert("Song selected: " + song.name);
  };

  return (
    <>
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='center'
      >
        <Grid item>
          <label>Song Name:</label>
        </Grid>
        <Grid item p={3}>
          {/* Might switch this to MUI Autocomplete later */}
          <TextField
            id='outlined-basic'
            variant='outlined'
            size='small'
            value={songName}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </Grid>
        <Grid>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              handleClickSearch();
            }}
            endIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {displayResults && (
        <SongResults
          isSearchResults={isSearchResults}
          songs={songResults}
          handleSongSelect={handleSongSelect}
        />
      )}
    </>
  );
}

export default Search;
