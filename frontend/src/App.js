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
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <a href="https://gov.bc.ca/">
              <img alt="BC Government Logo" src={LOGO} width={154} />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link class="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/map">
                    Map
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/reporting">
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
          <Route path="/">
            <Home />
          </Route>
          <Route path="/reporting">
            <Reporting />
          </Route>
        </Switch>
        {/* <AuthorizationMap /> */}
        <nav class="navbar fixed-bottom navbar-dark bg-primary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#"></a>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
