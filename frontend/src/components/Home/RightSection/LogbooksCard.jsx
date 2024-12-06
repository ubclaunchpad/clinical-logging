import LogBooks from "../../../assets/images/logbooks.png";
import ProgressItem from "./ProgressItem";
import "./LogbooksCard.css";
import { useNavigate } from 'react-router-dom';

export default function LogbooksCard({ progressItems, setSelectedLog }) {
  const navigate = useNavigate();

  return (
    <div className="logbooks-card">
      <div className="card-header">
        <h2>Log Books</h2>
        <button className="view-more-btn" onClick={() => navigate('/logbooks')}>
          View more
        </button>
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
