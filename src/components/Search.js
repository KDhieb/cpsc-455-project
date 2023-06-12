import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchRecommendedSongs, searchSongs } from "../slices/songSearchSlice";
import SearchIcon from "@mui/icons-material/Search";
import SongResults from "./SongResults";
import ResultsSkeleton from "./ResultsSkeleton";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../styling/theme";

function Search() {
  const [songName, setSongName] = useState("");
  const dispatch = useDispatch();

  const [isSearchResults, setIsSearchResults] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [songResults, setSongResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // const sample_recommended_songs = sample_2_songs.tracks.items;

  const handleSearch = async (e) => {
    setSongName(e.target.value);
    if (isSearchResults) {
      if (e.target.value === "") {
        setDisplayResults(false);
      } else if (e.target.value.length >= 3) {
        setLoading(true);
        const response = await dispatch(
          searchSongs({ searchString: e.target.value })
        );
        const songs = unwrapResult(response).searchResults;
        setDisplayResults(true);
        setSongResults(songs.tracks.items);
        setLoading(false);
      }
    } else {
    }
  };

  const handleClickSearch = async () => {
    if (songName === "") {
      setDisplayResults(false);
    } else {
      setIsSearchResults(true);
      setLoading(true);
      const response = await dispatch(searchSongs({ searchString: songName }));
      const songs = unwrapResult(response).searchResults;
      setSongResults(songs.tracks.items);
      setLoading(false);
    }
  };

  const handleSongSelect = async (song) => {
    if (isSearchResults) {
      setSelectedSong(song);
      setLoading(true);
      const response = await dispatch(
        fetchRecommendedSongs({ songId: song.id })
      );
      const songs = unwrapResult(response).recommendedSongs;
      setIsSearchResults(false);
      setSongResults(songs.tracks);
      setLoading(false);
    } else {
      alert(`Recommended song selected: ${song.name} Id: ${song.id}`);
    }
  };

  return (
    <>
      <ThemeProvider theme={lightTheme}>
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
      </ThemeProvider>

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
            selectedSong={selectedSong}
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
