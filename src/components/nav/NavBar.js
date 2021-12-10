import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

//Link component generates Anchor tags for
//the "To" attribute is the htag attribute for Link anchor tag, both combine to create link in the DOM
export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/chraracters">Main Characters</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/items">Items</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/notes">My Notes</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="#" onClick={
                    () => {
                        localStorage.removeItem("strategy_user")
                    }
                }>Logout!</Link>
            </li>
        </ul>
    )
}

//Logout link removes value of logged-in user/gamer_user from local storage, causes state change for DOM to re-render page to login form