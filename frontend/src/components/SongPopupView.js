import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PlayableAlbumCover from "./PlayableAlbumCover";
import { Share } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Snackbar } from '@mui/material';
import LikeButton from "./LikeButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SongPopupView({ isDisplayed, handleClose, song }) {
  const [openShare, setOpenShare] = useState(false);

  if (!song) {
    return null;
  }
  
  const url = song.external_urls.spotify ?? `https://open.spotify.com/track/${song.id}`;
  
  const handleSpotifyClick = () => {
    window.open(url, "_blank", "noreferrer");
  };

  const handleShare = () => {
    setOpenShare(true)
    navigator.clipboard.writeText(url);
  };


  return (
    <div>
      <BootstrapDialog
        fullWidth={true}
        maxWidth={"xs"}
        sx={{ margin: "auto" }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={isDisplayed}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
            <Typography sx={{ paddingBottom: "5px", fontSize: "1.5rem",
    fontWeight: 500 }}>
              {song.name ?? song.songName}
            </Typography>
            <Typography variant="p" sx={{ color: "lightgray" }}>
              {song.artists[0].name}
            </Typography>
        </BootstrapDialogTitle>

        <DialogContent sx={{ margin: "auto" }}>
          <PlayableAlbumCover
            img={song.album.images[0].url}
            url={song.preview_url}
            size={250}
            mini={false}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "100px",
          }}
        >
          <IconButton
            onClick={handleSpotifyClick}
            sx={{ padding: "10px 10px" }}
          >
            <FontAwesomeIcon size='lg' icon={faSpotify} />
          </IconButton>
          <LikeButton song={song} />
          <IconButton size={"large"} onClick={handleShare}>
            <Share fontSize="'large" />
          </IconButton>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={openShare}
            onClose={() => setOpenShare(false)}
            autoHideDuration={1500}
            message="Copied Spotify link!"
            ContentProps={{
              style: {
                backgroundColor: 'black',
                color: 'white',
              }}}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
