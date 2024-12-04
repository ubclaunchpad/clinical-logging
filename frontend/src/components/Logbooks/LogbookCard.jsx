import { LogbookTypeInfo } from "./LogbookTypeInfo";
import LogRectangle from "../../assets/images/LogRectangle.png";
import "./LogbookCard.css";

export default function LogbookCard({ title, type, storage, created }) {
  /** Retrieve type information from the mapping */
  const typeInfo = LogbookTypeInfo[type] || {};

  /** Construct class name */
  const className = ["logbook-card", typeInfo.className]
    .filter(Boolean)
    .join(" ");

  /** Get the corresponding book image */
  const bookImage = typeInfo.image || LogRectangle; // Fallback to LogRectangle if image not found

  return (
    <div className={className}>
      <div className="book-cover">
        <img src={bookImage} alt={type} className="book-cover-image" />
      </div>
      <div className="details-container">
        <img src={LogRectangle} alt="" className="log-rectangle" />
        <div className="book-details">
          <h3 className="book-title">{title}</h3>
          <div className="type-label">
            Type: <span className="type-value">{type}</span>
          </div>
          <div className="storage-info">
            Storage: <span className="storage-count">{storage}</span>/100 logs
            used
          </div>
          <div className="created-date">
            <strong>Created</strong> {created}
          </div>
        </div>
      </div>
    </div>
  );
}
