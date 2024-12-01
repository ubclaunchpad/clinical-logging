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

/** Mapping of logbook types to their class names and images */
const logbookTypeInfo = {
  "Cardiac Surgery - Adult": {
    className: "",
    image: AdultCardiac,
  },
  "Cardiac Surgery - Congenital": {
    className: "congenital",
    image: CongenitalCardiac,
  },
  Ophthalmology: {
    className: "ophthalmology",
    image: Ophthalmology,
  },
  "Obstetrics/Gynecology": {
    className: "obstetrics",
    image: Obstetrics,
  },
  "General Surgery": {
    className: "general-surgery",
    image: GeneralSurgery,
  },
};

function MainContent() {
  /** Array of logbook data */
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
          <LogbookCard key={index} {...book} />
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
  /** Retrieve type information from the mapping */
  const typeInfo = logbookTypeInfo[type] || {};

  /** Construct class name */
  const className = ["logbook-card", typeInfo.className]
    .filter(Boolean)
    .join(" ");

  /** Get the corresponding book image */
  const bookImage = typeInfo.image || AdultCardiac;

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
