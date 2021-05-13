import "./App.css";
import { LOGO } from "./assets";
import AuthorizationMap from "./AuthorizationMap";

function App() {
  return (
    <div className="App">
      {/* <nav class="navbar fixed-top navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <a href="https://gov.bc.ca/">
              <img alt="BC Government Logo" src={LOGO} width={154} />
            </a>
            The Back Yard
          </a>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

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
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Map
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Reporting
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AuthorizationMap />
      <nav class="navbar fixed-bottom navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"></a>
        </div>
      </nav>
    </div>
  );
}

export default App;
