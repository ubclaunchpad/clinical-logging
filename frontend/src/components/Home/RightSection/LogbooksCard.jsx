import LogBooks from "../../../assets/images/logbooks.png";
import ProgressItem from "./ProgressItem";
import "./LogbooksCard.css";

export default function LogbooksCard({ progressItems, setSelectedLog }) {
  return (
    <div className="logbooks-card">
      <div className="card-header">
        <h2>Log Books</h2>
        <button className="view-more-btn">View more</button>
      </div>
      <div className="logbooks-content">
        <img src={LogBooks} alt="Logbooks" className="logbooks-image" />
        <div className="progress-list">
          {progressItems.map((item) => (
            <ProgressItem
              key={item.id}
              item={item}
              onClick={() => setSelectedLog(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
