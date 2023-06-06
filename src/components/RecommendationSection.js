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
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useSelector } from "react-redux";

export default function RecommendationSection() {
  // https://mui.com/material-ui/react-list/
  // https://codesandbox.io/s/nd1qej?file=/demo.js:1912-1922
  const songs = useSelector((state) => state.recommendedSongs.current);
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
            sx={{ width: "100%", maxWidth: "md", bgcolor: "background.paper" }}
          >
            <ListItemText
              sx={{ marginLeft: 2 }}
              primary="You might like . . ."
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "medium",
                letterSpacing: 0,
              }}
            />
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
                <IconButton
                  onClick={() => console.log("clicked favourite")}
                  sx={{ marginLeft: 2 }}
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
