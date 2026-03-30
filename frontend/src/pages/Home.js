import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="home">
      <div className="home-text">
        <h1>Major Confusion</h1>
        <h2>Find your future with confidence</h2>

        <div className="home-buttons">
          <Link to="/menu" className="btn btn-outline">
            Discover Your Future Career
          </Link>

          {!user && (
            <>
              <Link to="/login" className="btn btn-outline">
                Sign in
              </Link>
              <Link to="/register" className="btn btn-outline">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;