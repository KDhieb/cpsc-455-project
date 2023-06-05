import {NavLink} from "react-router-dom";
import "../styling/navbar.css"

const Navbar = () => {
    return (
            <nav className="nav-bar">
                <div className="logo">
                    <NavLink to="/" className="logo-link">
                        Vibesphere
                    </NavLink>
                </div>
                <NavLink to="/scoreboard" activeclassname="active">
                    Scoreboard
                </NavLink>
                <NavLink to="/about" activeclassname="active">
                    About
                </NavLink>
                <NavLink to="/" activeclassname="active-home">
                    Home
                </NavLink>
            </nav>
    )
}

export default Navbar
