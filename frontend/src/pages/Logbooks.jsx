import TopNav from "../components/TopNav/TopNav";
import Navbar from "../components/Navbar/Navbar";
import ContentHeader from "../components/ContentHeader/ContentHeader";
import "./styles/Logbooks.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import LogRectangle from "../assets/images/LogRectangle.png";
import AdultCardiac from "../assets/images/adult-cardiac-book.png";
import CongenitalCardiac from "../assets/images/congenital-cardiac-book.png";
import Obstetrics from "../assets/images/obstetrics-book.png";
import GeneralSurgery from "../assets/images/general-surgery-book.png";
import Ophthalmology from "../assets/images/ophthalmology-book.png";

function LogbookCard({ title, type, storage, created }) {
  const getCardClassName = () => {
    let className = "logbook-card";
    if (type === "cardiac-congenital") {
      className += " congenital";
    } else if (type === "ophthalmology") {
      className += " ophthalmology";
    } else if (type === "obstetrics") {
      className += " obstetrics";
    } else if (type === "general-surgery") {
      className += " general-surgery";
    }
    return className;
  };

  const getBookImage = () => {
    switch (type) {
      case "cardiac-adult":
        return AdultCardiac;
      case "cardiac-congenital":
        return CongenitalCardiac;
      case "ophthalmology":
        return Ophthalmology;
      case "obstetrics":
        return Obstetrics;
      case "general-surgery":
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

function Logbooks() {
  const logbooks = [
    {
      title: "Cardiac Surgery - Nov.",
      type: "cardiac-adult",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "Cardiac Cong. - Nov.",
      type: "cardiac-congenital",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "Ophthalmology - Nov.",
      type: "ophthalmology",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "OB/GYN - Nov.",
      type: "obstetrics",
      storage: "20",
      created: "10-01-2024",
    },
    {
      title: "General Surgery - Nov.",
      type: "general-surgery",
      storage: "20",
      created: "10-01-2024",
    },
    // Add more logbooks as needed
  ];

  return (
    <div className="page-container">
      <TopNav />
      <Navbar />
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
    </div>
  );
}

export default Logbooks;
