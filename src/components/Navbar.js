import {NavLink} from "react-router-dom";
import "./styles.css"

const Navbar = () => {
    return (
        <>
            <nav className="nav-bar">
                <NavLink to="/scoreboard">
                    Scoreboard
                </NavLink>
                <NavLink to="/about">
                    About
                </NavLink>
                <NavLink to="/" >
                    Home
                </NavLink>
            </nav>
        </>
    )
}

export default Navbar
