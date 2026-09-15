import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Charts from "../components/Charts";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <h2>Home</h2>

        {/* HERO */}
        <div className="hero">
          <h1>Your Career Journey Starts Here</h1>
          <p>
            Discover in-demand majors, take a career quiz,
            and find the perfect path for you.
          </p>

          <div className="hero-buttons">
            <Link to="/quiz" className="outline">
              Take Career Quiz →
            </Link>

            <Link to="/majors" className="text-btn">
              Browse Majors
            </Link>

            
          </div>
        </div>

        {/* CARDS */}
        <div className="cards">
          <Card
            title="Explore Majors"
            desc="Browse 50+ career paths"
            path="/majors"
          />

          <Card
            title="Take the Quiz"
            desc="Find your ideal major"
            path="/quiz"
          />

          <Card
            title="Community"
            desc="Connect with students"
            path="/community"
          />
        </div>

        {/* CHARTS */}
        <Charts />
      </div>
    </div>
  );
}