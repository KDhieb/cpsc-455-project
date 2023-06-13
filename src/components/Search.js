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
import SongPopupView from "./SongPopupView";

function Search() {
  const [songName, setSongName] = useState("");
  const dispatch = useDispatch();

  const [isSearchResults, setIsSearchResults] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [songResults, setSongResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSongFromSearch, setSelectedSongFromSearch] = useState(null);
  const [selectedSongFromRecommended, setSelectedSongFromRecommended] =
    useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);

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
      setSelectedSongFromSearch(song);
      setLoading(true);
      const response = await dispatch(fetchRecommendedSongs({ song: song }));
      const songs = unwrapResult(response).recommendedSongs;
      setIsSearchResults(false);
      console.log(songs);
      setSongResults(songs.tracks);
      setLoading(false);
    } else {
      setSelectedSongFromRecommended(song);
      setDisplayPopup(true);
    }
  };

  const handleClosePopup = () => {
    setDisplayPopup(false);
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
            selectedSongFromSearch={selectedSongFromSearch}
            isSearchResults={isSearchResults}
            songs={songResults}
            handleSongSelect={handleSongSelect}
          />
        )
      )}
      {displayPopup && (
        <SongPopupView
          isDisplayed={displayPopup}
          handleClose={handleClosePopup}
          song={selectedSongFromRecommended}
        />
      )}
    </>
  );
}

export default Search;
