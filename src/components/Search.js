import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchRecommendedSongs, searchSongs } from "../slices/songSearchSlice";
import SearchIcon from "@mui/icons-material/Search";
import SongResults from "./SongResults";
import ResultsSkeleton from "./ResultsSkeleton";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../styling/theme";
import SongPopupView from "./SongPopupView";
import { useSelector } from "react-redux";

function Search() {
  const dispatch = useDispatch();

  const [songSearchString, setSongSearchString] = useState("");
  const [isSearchResults, setIsSearchResults] = useState(true);
  const [displayResults, setDisplayResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSongFromSearch, setSelectedSongFromSearch] = useState(null);
  const [selectedSongFromRecommended, setSelectedSongFromRecommended] =
    useState(null);
  const [displayPopup, setDisplayPopup] = useState(false);

  const songsState = useSelector((state) => state.songSearch);

  const handleSearch = async (e) => {
    setSongSearchString(e.target.value);
    if (isSearchResults) {
      if (e.target.value === "") {
        setDisplayResults(false);
      } else if (e.target.value.length >= 3) {
        setLoading(true);
        await dispatch(searchSongs({ searchString: e.target.value }));
        setDisplayResults(true);
        setLoading(false);
      }
    }
  };

  const handleClickSearch = async () => {
    if (songSearchString === "") {
      setDisplayResults(false);
    } else {
      setIsSearchResults(true);
      setLoading(true);
      await dispatch(searchSongs({ searchString: songSearchString }));
      setLoading(false);
    }
  };

  const handleSongSelect = async (song) => {
    if (isSearchResults) {
      setSelectedSongFromSearch(song);
      setLoading(true);
      await dispatch(fetchRecommendedSongs({ song: song }));
      setIsSearchResults(false);
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
              value={songSearchString}
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
            songs={
              isSearchResults
                ? songsState.searchResults
                : songsState.recommendedSongs
            }
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
