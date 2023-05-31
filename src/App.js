import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from "./components/pages/Home";
import {About} from "./components/pages/About";
import {Scoreboard} from "./components/pages/Scoreboard";
import Navbar from "./components/Navbar";
function App() {
    return(
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
