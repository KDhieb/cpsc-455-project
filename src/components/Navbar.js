import {NavLink} from "react-router-dom";
import "./styles.css"

const Navbar = () => {
    return (
            <nav className="nav-bar">
                <div className="logo">
                    <NavLink to="/" className="logo-link">
                        Vibesphere
                    </NavLink>
                </div>
                <NavLink to="/scoreboard" activeClassName="active">
                    Scoreboard
                </NavLink>
                <NavLink to="/about" activeClassName="active">
                    About
                </NavLink>
                <NavLink to="/" activeClassName="active-home">
                    Home
                </NavLink>
            </nav>
    )
}

export default Navbar
