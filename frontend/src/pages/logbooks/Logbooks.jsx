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
import { useState, useEffect } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { fetchData } from "../../utils/helpers/fetchData";
import { postData } from "../../utils/helpers/postData";

export default function Logbooks() {
  /** Retrieve user's logbooks from API */
  const [logbooks, setLogbooks] = useState([]);
  const { session } = useAuth();

  async function fetchLogbooks() {
    const response = await fetchData(session?.access_token, "logbooks");
    setLogbooks(response);
  }

  async function createLogbook() {
    await postData(session?.access_token, "logbooks", {type: "gyn_logs", title: "testTitle" });
  }

  const handleAddLogbook = async () => {
    try {
      await createLogbook();
      await fetchLogbooks();
    } catch (error){
      console.log(error);
    }
  }



  /** Array of logbook actions */
  const logbookActions = [
    {
      label: "Configure",
      icon: PencilSquareIcon,
      onClick: handleAddLogbook,
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

  useEffect(() => {
    fetchLogbooks();
  }, []);

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
