import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="inline-flex between">
        <div>
          <h1>Not in My Back Yard (NiMBY)</h1>
          <div className="home-content">
            <h3>Use this service to:</h3>
            <ul>
              <li>Projects being proposed</li>
              <li>Projects that have been approved</li>
              <li>How well projects are meeting environmental requirements</li>
              <li>Waste being released into the environment</li>
            </ul>

            <br />
            <Link className="nav-link" to="/map">
              <button type="button" class="btn btn-secondary">
                Start Now
              </button>
            </Link>
          </div>
          <br />
          <br />
          <h1>Who is this service for?</h1>
          <div className="home-content">
            <h1>Looking for more Information?</h1>
            <h3>Looking for more Information?</h3>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
