import { useState } from "react";
import {TextField, Button, Grid} from "@mui/material";
import { useDispatch } from "react-redux";
import { songSearch } from "../slices/songSearchSlice";
import SearchIcon from "@mui/icons-material/Search";
import SongResults from "./SongResults";
import { sample_1_songs, sample_2_songs } from "../sample/sample";
import ResultsSkeleton from "./ResultsSkeleton";
import {ThemeProvider} from "@mui/material/styles";
import {lightTheme} from "../styling/theme";

function Search() {
  const [songName, setSongName] = useState("");
  const dispatch = useDispatch();

  const [isSearchResults, setIsSearchResults] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [songResults, setSongResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const sample_search_songs = sample_1_songs.tracks.items;
  const sample_recommended_songs = sample_2_songs.tracks.items;

  const handleSearch = (e) => {
    setSongName(e.target.value);
    if (isSearchResults) {
      if (e.target.value === "") {
        setDisplayResults(false);
      } else {
        // todo call api here to fetch songs
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setDisplayResults(true);
        setSongResults(sample_search_songs);
      }
    } else {
    }
  };

  const handleClickSearch = () => {
    if (songName === "") {
      setDisplayResults(false);
    } else {
      setIsSearchResults(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      dispatch(songSearch(songName)); // decide if we want to use redux or not
      setSongResults(sample_search_songs);
      // call search api again - edge case: searching after recommendation results have been displayed
    }
  };

  const handleSongSelect = (song) => {
    if (isSearchResults) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
      setIsSearchResults(false);
      setSongResults(sample_recommended_songs);
      alert("Song selected: " + song.name);
    } else {
      alert("Recommended song selected: " + song.name);
    }
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
          <ThemeProvider theme={lightTheme}>
          <TextField
            id='outlined-basic'
            variant='outlined'
            size='small'
            value={songName}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          </ThemeProvider>
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

      {loading ? (
        <>
          <ResultsSkeleton
            displayText={
              isSearchResults ? "Searching..." : "Generating recommendations..."
            }
          />
        </>
      ) : (
        displayResults && (
          <SongResults
            isSearchResults={isSearchResults}
            songs={songResults}
            handleSongSelect={handleSongSelect}
          />
        )
      )}
    </>
  );
}

export default Search;
