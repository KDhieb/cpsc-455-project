import GloballySearched from "../components/GloballySearched";
import Search from "../components/Search";

export const Home = () => {
  return (
    <>
      <Search />
      <GloballySearched songsPerGroup={4} />
    </>
  );
};
