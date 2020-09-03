import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <header className='header'>
      <div className='wrap-search'>
        <Link className='header__link logo-cenima' to='/'>
          Cenima
        </Link>

        <div className='menu'>
          <div className='menu__item'>
            <Link to='/movies'>Movies</Link>
          </div>
          <div className='menu__item'>
            <Link to='/theaters'>Theaters</Link>
          </div>
          <div className='menu__item'>
            <Link to='/membership'>Membership</Link>
          </div>
        </div>

        <form>
          <input
            tpye='search'
            id='search'
            name='search'
            placeholder='Search movies, theaters, ...'
          />
          <label htmlFor='search'>Search</label>
        </form>
      </div>

      <div className='header__login-register'>
        {!currentUser ? (
          <Link className='header__link item' to='/register'>
            Register
          </Link>
        ) : (
          ""
        )}
        {!currentUser ? (
          <Link className='header__link item' to='/login'>
            Login
          </Link>
        ) : (
          <Link className='header__link item' to='/logout'>
            Logout
          </Link>
        )}
      </div>

      <Link className='header__link logout' to='/logout'>
        Logout
      </Link>
    </header>
  );
}

export default Header;
