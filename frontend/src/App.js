import "./App.css";
import { LOGO } from "./assets";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthorizationMap from "./AuthorizationMap";
import Home from "./Home";
import Reporting from "./Reporting";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a href="https://gov.bc.ca/">
              <img alt="BC Government Logo" src={LOGO} width={154} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/map">
                    Map
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reporting">
                    Reporting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/map">
            <AuthorizationMap />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/reporting">
            <Reporting />
          </Route>
        </Switch>
        {/* <AuthorizationMap /> */}
        <nav className="navbar fixed-bottom navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"></a>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
