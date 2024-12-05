import { NavContentWrapper } from "../../components/NavContentWrapper/NavContentWrapper";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import LogbookCard from "../../components/Logbooks/LogbookCard";
import AddLogbookCard from "../../components/Logbooks/AddLogbookCard";
import "./Logbooks.css";
import {
  PencilSquareIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

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

/** Array of logbook actions */
const logbookActions = [
  {
    label: "Configure",
    icon: PencilSquareIcon,
    onClick: () => {},
  },
  {
    label: "Download",
    icon: ArrowDownTrayIcon,
    onClick: () => {},
  },
  {
    label: "Filter",
    icon: AdjustmentsHorizontalIcon,
    onClick: () => {},
  },
  {
    label: "View",
    icon: EyeIcon,
    onClick: () => {},
  },
  {
    label: "Delete",
    icon: TrashIcon,
    onClick: () => {},
  },
];

export default function Logbooks() {
  return (
    <NavContentWrapper>
      <div className="logbooks-container">
        <ContentHeader
          header="Logbooks"
          primaryButtonText="Add Book"
          actions={logbookActions}
        />
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
