import { AppBar } from "../../components/AppBar/AppBar";
import { LogSavedSuccessModal } from "../../components/Modals/LogSavedSuccessModal/LogSavedSuccessModal";
import { ConfirmCancelModal } from "../../components/Modals/ConfirmCancelModal/ConfirmCancelModal";
import { SurgicalAndPatientInfo } from "./sections/surgical_and_patient_info/SurgicalAndPatientInfo";
import { ExaminationsAndInvestigations } from "./sections/examinations_and_investigations/ExaminationsAndInvestigations";
import { CasePlanning } from "./sections/case_planning/CasePlanning";
import { LearningPoints } from "./sections/learning_points/LearningPoints";
import { Divider } from "@mui/material";
import "./ManualEntry.css"

/**
 * TODO: Add IntersectionObserver scrollable sticky header behaviour
 * https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
 * https://dev.to/dance2die/react-sticky-event-with-intersection-observer-310h
 */
const ManualEntry = () => {
  const [formData, setFormData] = useState({
    // TODO
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // TODO
    } catch (err) {
      // TODO
    }
  }

  return (
    <div>
      <AppBar />
      <form onSubmit={() => {}}>
        <div className="manual-entry-container">
          <Divider />
          <h2 className="section-header">1. Surgical and Patient Information</h2>
          <SurgicalAndPatientInfo />
          <h2 className="section-header">2. Examinations and Investigations</h2>
          <ExaminationsAndInvestigations />
          <h2 className="section-header">3. Case Planning</h2>
          <CasePlanning />
          <h2 className="section-header">4. Learning Points</h2>
          <LearningPoints />
          <div className="manual-entry-buttons-footer">
            <ConfirmCancelModal />
            <LogSavedSuccessModal />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManualEntry;
