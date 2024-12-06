import { CLButtonSecondary } from "../../Buttons/CLButtons";
import { NewLogModal } from "../../NewLogModal/NewLogModal";
import "./GetStartedCard.css";

export default function GetStartedCard({
  handleAddLogbook,
  handleViewHistory,
}) {
  return (
    <div className="get-started-card">
      <h2>Get Started</h2>
      <p>
        Convert handwritten clinical logs to standardized excel templates with
        just a click of a button!
      </p>
      <div className="button-stack">
        <NewLogModal />
        <CLButtonSecondary onClick={handleAddLogbook} width={"230px"}>
          Add Logbook
        </CLButtonSecondary>
        <CLButtonSecondary onClick={handleViewHistory} width={"230px"}>
          View Log History
        </CLButtonSecondary>
      </div>
    </div>
  );
}
