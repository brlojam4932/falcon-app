import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const linkExchanges = "/exchanges";
  const linkNewsPage = "/newsPage";
  //const coinDetailLink = "/coinDetails";
  /* select + ctrl D x; selects all */
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Falcon Trades</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Crypto
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={linkNewsPage}>News</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={linkExchanges}>Exchanges</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;