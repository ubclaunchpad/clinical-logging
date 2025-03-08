import { useState } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { LogSavedSuccessModal } from "../../components/Modals/LogSavedSuccessModal/LogSavedSuccessModal";
import { ConfirmCancelModal } from "../../components/Modals/ConfirmCancelModal/ConfirmCancelModal";
import { SurgicalAndPatientInfo } from "./sections/surgical_and_patient_info/SurgicalAndPatientInfo";
import { ExaminationsAndInvestigations } from "./sections/examinations_and_investigations/ExaminationsAndInvestigations";
import { CasePlanning } from "./sections/case_planning/CasePlanning";
import { LearningPoints } from "./sections/learning_points/LearningPoints";
import { useAuth } from "../../contexts/AuthContext"
import { postData } from "../../utils/helpers/postData";
import { blankFormData } from "./data/ManualEntryBlankFormData";
import { Divider } from "@mui/material";
import "./ManualEntry.css"

/**
 * TODO: Add IntersectionObserver scrollable sticky header behaviour
 * https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
 * https://dev.to/dance2die/react-sticky-event-with-intersection-observer-310h
 */
const ManualEntry = () => {
  const { session } = useAuth();
  const [formData, setFormData] = useState(blankFormData());

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const getDataValue = (field) => {
    return formData[field];
  }

  const handleSubmit = async () => {
    try {
      console.log(formData); // TODO: remove
      const res = postData(session?.access_token, "logbooks/306375dc-c6e3-4c5d-b08b-1b53023e5cab/logs", formData); // TODO: fix this
      console.log("Submitted successfully: " + res); // TODO: fix this
    } catch (err) {
      console.log("Error submitting: " + err);
    }
  }

  return (
    <div>
      <AppBar />
      <form>
        <div className="manual-entry-container">
          <Divider />
          <h2 className="section-header">1. Surgical and Patient Information</h2>
          <SurgicalAndPatientInfo
            getDataValue={getDataValue}
            onInputChange={handleInputChange}
          />
          <h2 className="section-header">2. Examinations and Investigations</h2>
          <ExaminationsAndInvestigations
            getDataValue={getDataValue}
            onInputChange={handleInputChange}
          />
          <h2 className="section-header">3. Case Planning</h2>
          <CasePlanning
            getDataValue={getDataValue}
            onInputChange={handleInputChange}
          />
          <h2 className="section-header">4. Learning Points</h2>
          <LearningPoints
            getDataValue={getDataValue}
            onInputChange={handleInputChange}
          />
          <div className="manual-entry-buttons-footer">
            <ConfirmCancelModal />
            <LogSavedSuccessModal onSubmit={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManualEntry;
