import GloballySearched from "../components/GloballySearched";
import RecommendationSection from "../components/SongResults";
import Search from "../components/Search";

export const Home = () => {
  return (
    <>
      <Search />
      {/* <RecommendationSection /> */}
      <GloballySearched songsPerGroup={4} />
    </>
  );
};
