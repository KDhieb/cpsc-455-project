import {
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export default function RecommendationSection() {
  // https://mui.com/material-ui/react-list/
  // https://codesandbox.io/s/nd1qej?file=/demo.js:1912-1922
  const songs = [
    {
      id: "id1",
      imageUrl: "https://dummyimage.com/300",
      songName: "SongName1",
      artistName: "ArtistName1",
    },
    {
      id: "id2",
      imageUrl: "https://dummyimage.com/300",
      songName: "SongName2",
      artistName: "ArtistName2",
    },
  ];
  return (
    <Box display="flex" justifyContent="center">
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: "dark",
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {songs.map((song) => (
              <ListItemButton
                key={song.id}
                sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
              >
                <Avatar
                  sx={{ marginRight: 2 }}
                  src={song.imageUrl}
                  variant="square"
                />
                <ListItemText
                  primary={song.songName}
                  secondary={song.artistName}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
                <IconButton onClick={() => console.log("clicked play")}>
                  <PlayCircleOutlineIcon />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
