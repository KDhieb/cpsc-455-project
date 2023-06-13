import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { updateLikes } from "../slices/likesSlice";
import { useSelector } from "react-redux";

export default function LikeButton({ song, favoritedCallback = () => {} }) {
  const [favorited, setFavorited] = useState(false);

  const dispatch = useDispatch();
  const { songsLiked } = useSelector((state) => state.likes);

  useEffect(() => {
    const isLiked = Boolean(songsLiked[song.id]);
    setFavorited(isLiked);
  }, [song.id, songsLiked]);

  const handleFavorite = async () => {
    favoritedCallback();
    // todo add logic for favorite
    setFavorited(!favorited);
    console.log(song);
    const response = await dispatch(
      updateLikes({ songId: song.id, isLiked: !favorited })
    );
    const result = unwrapResult(response);
    console.log(result);
  };

  return (
    <IconButton
      onClick={async () => {
        await handleFavorite(song);
      }}
      sx={{ marginLeft: 2 }}
    >
      {favorited ? <Favorite color='error' /> : <FavoriteBorderOutlinedIcon />}
    </IconButton>
  );
}
