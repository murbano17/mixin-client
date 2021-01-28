import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <div className="home__info">
        <h1 className="home__heading animate__animated animate__bounceInLeft">
          Welcome to <br />
          <span>mixin!</span>
        </h1>
        <div className="home__btn-container">
          <Link to="/login">
            <button className="btn btn-home">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-home btn-home-sign">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
