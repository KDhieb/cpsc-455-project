import { scoreboardTestData } from "../assets/data/scoreboardTestData";
import { ScoreboardSongCard } from "../components/ScoreboardSongCard";
import { SCOREBOARD_HEADERS } from "../constants/constants";
import "../styling/scoreboard.css";

export const Scoreboard = () => {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard-headers">
        <p>{SCOREBOARD_HEADERS.album}</p>
        <p>{SCOREBOARD_HEADERS.nameArtist}</p>
        <p>{SCOREBOARD_HEADERS.likes}</p>
      </div>
      {scoreboardTestData.map((song, index) => {
        return <ScoreboardSongCard song={song} key={index} ranking={index + 1} />;
      })}
    </div>
  );
};
