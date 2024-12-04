import "./ProgressItem.css";

export default function ProgressItem({ item, onClick }) {
  return (
    <div className="progress-item" onClick={onClick}>
      <div className="progress-info">
        <span>{item.name}</span>
        <span>{item.progress}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    </div>
  );
}
