import React from 'react'
import { Link } from "react-router-dom";


function Header() {


    return (
        <header className="header">
            <div className="wrap-search">
                <Link className="header__link logo-cenima" to="/">Cenima</Link>

                <form>
                    <input tpye="search" id="search" name="search" placeholder="Search movies, theaters, ..." />
                    <label htmlFor="search" >Search</label>
                </form>
            </div>

            <div className="header__login-register">
                <Link className="header__link item" to="/register">Register</Link>
                <Link className="header__link item" to="/login">Login</Link>
            </div>

            <Link className="header__link logout" to="/logout">Logout</Link>

        </header>



    )
}

export default Header
