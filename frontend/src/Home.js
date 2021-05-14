import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Not in My Back Yard (NiMBY)</h1>
      <div className="home-content">
        <h3>Use this service to:</h3>
        <ul>
          <li>View a bunch of stuff</li>
          <li>Look at different locations</li>
          <li>Understand reporting in your area</li>
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
        <h3>This service is for:</h3>
        <ul>
          <li>The general public</li>
          <li>Media</li>
          <li>Contractors, etc.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
