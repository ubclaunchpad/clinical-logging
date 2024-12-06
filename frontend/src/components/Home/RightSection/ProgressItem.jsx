import "./ProgressItem.css";

export default function ProgressItem({ item, onClick }) {
  return (
    <div className="logbook-progress-item" onClick={onClick}>
      <div className="logbook-progress-info">
        <span>{item.name}</span>
        <span>{item.progress}%</span>
      </div>
      <div className="logbook-progress-bar">
        <div
          className="logbook-progress-fill"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    </div>
  );
}
