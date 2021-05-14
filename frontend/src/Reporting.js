import "./App.css";

const iframeUrl = "";

const Reporting = () => {
  return (
    <div>
      <iframe
        title="metabaseDashboard"
        src={iframeUrl}
        frameBorder="0"
        width="100%"
        height="2700px"
      />
    </div>
  );
};

export default Reporting;
