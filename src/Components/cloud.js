import "./css/cloud.css";
import "../index.css";

function Cloud(props) {
  return (
    <div id="cloud">
      <div className="cloud">
        <div className="cloud-bg">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>{props.title}</h1>
        <h2>{props.description}</h2>
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default Cloud;
