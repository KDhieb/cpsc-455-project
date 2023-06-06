import "../styling/scoreboardSongCard.css";
import MusicPlayer from "./MusicPlayer";

export const ScoreboardSongCard = ({ song, ranking }) => {
  return (
    <div className='liked-song-card-container'>
      <p>{ranking}</p>
      <div className='song-info'>
        <MusicPlayer
          url={song.preview_url}
          img={song.albumCoverImg}
          mini={false}
        />
        <p>
          {song.name} - {song.artist}
        </p>
        <p>{song.likes}</p>
      </div>
    </div>
  );
};
