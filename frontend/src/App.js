import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Scoreboard } from "./pages/Scoreboard";
import Navbar from "./components/Navbar";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
