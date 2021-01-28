import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

const Navbar = ({ logout, isLoggedin, cart, userCart }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const logoutClick = () => {
    setClicked(!clicked);
    logout();
  };

  useEffect(() => {
    const getCart = async () => {
      await userCart();
    };
    getCart();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/products">
        <h1 className="navbar__logo">mixin</h1>
      </Link>
      {isLoggedin && (
        <>
          <div className="menu-icon" onClick={handleClick}>
            <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <ul className={clicked ? "navbar__menu active" : "navbar__menu"}>
            <li>
              <Link
                to="/cart"
                className="navbar__links navbar__links--mycart"
                onClick={handleClick}
              >
                cart
                {cart.length > 0 && (
                  <span className="navbar__links--mycart-number">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="navbar__links-mobile" onClick={logoutClick}>
              Log out
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default withAuth(Navbar);
