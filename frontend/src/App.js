import "./App.css";
import { LOGO } from "./assets";
import AuthorizationMap from "./AuthorizationMap";

function App() {
  return (
    <div className="App">
      <nav class="navbar fixed-top navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <a href="https://gov.bc.ca/">
              <img alt="BC Government Logo" src={LOGO} width={154} />
            </a>
            The Back Yard
          </a>
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
