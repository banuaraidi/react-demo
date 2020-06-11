import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import './App.css';

import Routes from "./Routes";

function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      userHasAuthenticated(true);
    }
    catch(e) {
      alert(e);
    }  
  }

  function handleLogout(event) {
    event.preventDefault();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {isAuthenticated 
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
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
