import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
     <div className="home">
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

      <h1>Looking for more Information?</h1>
      <div className="home-content">
      <h2>Applications</h2>
      <div style={{margin: "10px"}}>
        <p>All projects need to complete an application process to become authorized.</p>
        <p>Learn more about the{" "}
          <a href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization/search-application-status">application process.</a>
          </p>
      </div>
       <h2>Authorizations</h2>
       <div style={{margin: "10px"}}>
        <p>A waste discharge authorization is written permission to{" "} 
          <a href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization/find-authorization" >release waste</a>
           into the environment.</p>
      </div>
      <h2>Compliance & Enforcement</h2>
      <div style={{margin: "10px"}}>
        <p>Learn more about{" "}
          <a href="https://www2.gov.bc.ca/gov/content?id=5F2C798CEE2E4F3D94CEC7A345EDD54E">Environmental Compliance in B.C.</a>
           , or <a href="https://www2.gov.bc.ca/gov/content/environment/research-monitoring-reporting/reporting/environmental-enforcement-reporting" >Natural Resource Compliance and Enforcement Reporting</a></p>
      </div>
       <h2>Waste Discharge</h2>
       <div style={{margin: "10px"}}>
        <p>Waste discharge authorizations are authorizations such as Permits, Approvals, Operational Certificates,Registrations, etc that allow the discharge of waste to the environment under the Environmental Management Act.</p>
        <p>More information may be found <a href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization"> here. </a></p>
      </div>
      </div>
    </div>
  );
};

export default Home;
