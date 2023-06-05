import "../styling/scoreboardSongCard.css";

export const ScoreboardSongCard = ({ song, ranking }) => {
  return (
    <div className="liked-song-card-container">
      <p>{ranking}</p>
      <div className="song-info">
        <img src={song.albumCoverImg} />
        <p>
          {song.name} - {song.artist}
        </p>
        <p>{song.likes}</p>
      </div>
    </div>
  );
};
