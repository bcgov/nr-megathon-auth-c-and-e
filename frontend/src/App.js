import "./App.css";
import AuthorizationMap from "./AuthorizationMap";

function App() {
  return (
    <div className="App">
      <nav class="navbar fixed-top navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            BC Government
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
