import React, { useState , useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss'

const Navbar = () => {
      const [menu, showMenu] = useState(false)
      const [scroll , setScroll] = useState(false)

      window.addEventListener(scroll, () => {
            if (window.scrollY >= 700) {
                  setScroll(true)
            } else {
                  setScroll(false)
            }
      })
  let location = useLocation();

  useEffect(() => {
    console.log(location)
  }, [location]);
  
  return (
    <div className="navbar-wrapper">
      <h4>CloudNotes</h4>
      <div className={menu ? "navbar-container show" : "navbar-container"}>
        <Link
          className={`navlinks ${location.pathname === "/" ? "active" : ""}`}
          to="/"
          onClick={() => {
            showMenu(false);
          }}
        >
          Home
        </Link>
        <Link
          className={`navlinks ${
            location.pathname === "/mynotes" ? "active" : ""
          }`}
          to="/mynotes"
          onClick={() => {
            showMenu(false);
          }}
        >
          My notes
        </Link>
        <Link
          className={`navlinks ${
            location.pathname === "/pricing" ? "active" : ""
          }`}
          to="/pricing"
          onClick={() => {
            showMenu(false);
          }}
        >
          Pricing
        </Link>
        <button id="login">Login</button>
        <button id="sign-up">Sign up</button>
      </div>
      <i
        id="hamburger"
        onClick={() => {
          showMenu(!menu);
        }}
      >
        {menu ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars-staggered"></i>
        )}
      </i>
    </div>
  );
}

export default Navbar