import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import { PlusIcon } from "@heroicons/react/24/outline";
import LogRectangle from "../../assets/images/LogRectangle.png";
import AdultCardiac from "../../assets/images/adult-cardiac-book.png";
import CongenitalCardiac from "../../assets/images/congenital-cardiac-book.png";
import Obstetrics from "../../assets/images/obstetrics-book.png";
import GeneralSurgery from "../../assets/images/general-surgery-book.png";
import Ophthalmology from "../../assets/images/ophthalmology-book.png";
import "./Logbooks.css";

export default function Logbooks() {
  return (
    <NavContentWrapper>
      <MainContent />
    </NavContentWrapper>
  );
}

function MainContent() {
  const logbooks = [
    {
      title: "Cardiac Surgery - Nov.",
      type: "Cardiac Surgery - Adult",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "Cardiac Cong. - Nov.",
      type: "Cardiac Surgery - Congenital",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "Ophthalmology - Nov.",
      type: "Ophthalmology",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "OB/GYN - Nov.",
      type: "Obstetrics/Gynecology",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "General Surgery - Nov.",
      type: "General Surgery",
      storage: "20",
      created: "10-01-2024",
    },
    // Add more logbooks as needed
  ];

  return (
    <div className="logbooks-container">
      <ContentHeader />
      <div className="logbooks-grid">
        {logbooks.map((book, index) => (
          <LogbookCard
            key={index}
            title={book.title}
            type={book.type}
            storage={book.storage}
            created={book.created}
          />
        ))}
        <div className="add-logbook-card">
          <PlusIcon className="plus-circle-icon" />
          <span>Add Log Book</span>
        </div>
      </div>
    </div>
  );
}

function LogbookCard({ title, type, storage, created }) {
  const getCardClassName = () => {
    let className = "logbook-card";
    if (type === "Cardiac Surgery - Congenital") {
      className += " congenital";
    } else if (type === "Ophthalmology") {
      className += " ophthalmology";
    } else if (type === "Obstetrics/Gynecology") {
      className += " obstetrics";
    } else if (type === "General Surgery") {
      className += " general-surgery";
    }
    return className;
  };

  const getBookImage = () => {
    switch (type) {
      case "Cardiac Surgery - Adult":
        return AdultCardiac;
      case "Cardiac Surgery - Congenital":
        return CongenitalCardiac;
      case "Ophthalmology":
        return Ophthalmology;
      case "Obstetrics/Gynecology":
        return Obstetrics;
      case "General Surgery":
        return GeneralSurgery;
      default:
        return AdultCardiac;
    }
  };

  return (
    <div className={getCardClassName()}>
      <div className="book-cover">
        <img src={getBookImage()} alt="" className="book-cover-image" />
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
