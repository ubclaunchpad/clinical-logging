import { LogbookTypeInfo } from "./LogbookTypeInfo";
import LogRectangle from "../../assets/images/LogRectangle.png";
import "./LogbookCard.css";

export default function LogbookCard({ title, type, storage, created }) {
  /** Converts type to display name. */
  let formattedType;
  switch (type) {
    case "adult_cardiac_logs":
      formattedType = "Cardiac Surgery - Adult";
      break;
    case "congenital_surgery_logs":
      formattedType = "Cardiac Surgery - Congenital";
      break;
    case "general_surgery_logs":
      formattedType = "General Surgery";
      break;
    case "gyn_logs":
      formattedType = "Obstetrics/Gynecology";
      break;
    case "ob_logs":
      formattedType = "Obstetrics/Gynecology";
      break;
    default:
      formattedType = "Unknown Type";
      break;
  }

  /** Formats the date */
  const createdDate = new Date(created);
  const formattedDate = createdDate.toLocaleDateString('en-CA');

  /** Retrieve type information from the mapping */
  const typeInfo = LogbookTypeInfo[formattedType] || {};

  /** Construct class name */
  const className = ["logbook-card", typeInfo.className]
    .filter(Boolean)
    .join(" ");

  /** Get the corresponding book image */
  const bookImage = typeInfo.image || LogRectangle; // Fallback to LogRectangle if image not found

  return (
    <div className={className}>
      <div className="book-cover">
        <img src={bookImage} alt={formattedType} className="book-cover-image" />
      </div>
      <div className="details-container">
        <img src={LogRectangle} alt="" className="log-rectangle" />
        <div className="book-details">
          <h3 className="book-title">{title}</h3>
          <div className="type-label">
            Type: <span className="type-value">{formattedType}</span>
          </div>
          <div className="storage-info">
            Storage: <span className="storage-count">{storage}</span>/ 100 logs
            used
          </div>
          <div className="created-date">
            <strong>Created</strong> {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}
