import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import LogbookCard from "../../components/Logbooks/LogbookCard";
import AddLogbookCard from "../../components/Logbooks/AddLogbookCard";
import "./Logbooks.css";

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

export default function Logbooks() {
  return (
    <NavContentWrapper>
      <div className="logbooks-container">
        <ContentHeader />
        <div className="logbooks-grid">
          {logbooks.map((book, index) => (
            <LogbookCard key={index} {...book} />
          ))}
          <AddLogbookCard />
        </div>
      </div>
    </NavContentWrapper>
  );
}
