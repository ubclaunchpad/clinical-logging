import { NewLogModal } from "../../NewLogModal/NewLogModal";
import { CLButtonSecondary } from "../../Buttons/CLButtons";
import "./GetStartedCard.css";

export default function GetStartedCard({
  handleAddLogbook,
  handleViewHistory,
}) {
  return (
    <div className="get-started-card">
      <div className="get-started-card__content">
        <div className="get-started-card__header">
          <div className="get-started-card__title">Get Started</div>
          <div className="get-started-card__description">
            Convert handwritten clinical logs to standardized excel templates
            with just a click of a button!
          </div>
        </div>
        <div className="get-started-card__actions">
          <NewLogModal />
          <CLButtonSecondary
            onClick={handleAddLogbook}
            width={"332px"}
            height={"54px"}
          >
            Add Logbook
          </CLButtonSecondary>
          <CLButtonSecondary
            onClick={handleViewHistory}
            width={"332px"}
            height={"54px"}
          >
            View Log History
          </CLButtonSecondary>
        </div>
      </div>
    </div>
  );
}
