import "./App.css";

const iframeUrl = "";

const Reporting = () => {
  return (
    <div>
      <iframe
        title="metabaseDashboard"
        src="https://nimby.apps.silver.devops.gov.bc.ca/public/dashboard/33e7d420-23b1-4304-a450-6cc6d292223d" 
        frameBorder="0"
        width="100%"
        height="2700px"
      />
    </div>
  );
};

export default Reporting;
