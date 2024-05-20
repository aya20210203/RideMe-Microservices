import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container-fluid">
          <Link className="navbar-brand text-white fw-bold fs-4" to="/">
            Ride Me
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-white border rounded-1"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item me-1">
                <Link
                  className="nav-link rounded-pill"
                  to="/passengerrequestride"
                >
                  
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link rounded-pill"
                  to="/passengerridehistory"
                >
                  
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item me-1">
                <Link to="/loginpage" className="btn rounded-pill">
                  
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="registermainpage"
                  className=""
                >
                  
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
