import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { AppContext } from "./libs/contextLib";
import './App.css';

import Routes from "./Routes";

function App() {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['login']);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout(event) {
    event.preventDefault();
    userHasAuthenticated(false);
    setCookie('login', false, { path: '/' });
    history.push("/login");
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {cookies.login === "true" 
              ? 
                <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/todo"}>Todo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/logout"} onClick={handleLogout}>Logout</Link>
                </li>
                </>
              : <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, hadCookie: cookies, setCookie }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
