import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useDispatch } from 'react-redux';
import { searchSong } from "../actions";
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const [songName, setSongName] = useState("");
    const dispatch = useDispatch();

    return(
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Grid item>
                    <label>Song Name:</label> 
                </Grid>
                <Grid item p={3}>
                    {/* Might switch this to MUI Autocomplete later */}
                    <TextField id="outlined-basic" variant="outlined" size="small" value={songName} onChange={e => setSongName(e.target.value)}/>
                </Grid>
                <Grid>
                    <Button variant="contained" color="success" onClick={() => dispatch(searchSong(songName))} endIcon={<SearchIcon />}>Search</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Search;