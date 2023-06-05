import GloballySearched from "../components/GloballySearched";
import RecommendationSection from "../components/RecommendationSection";
import Search from "../components/Search";

export const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Search />
      <RecommendationSection />
      <GloballySearched songsPerGroup={4} />
    </>
  );
};
