import { useState } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { LogSavedSuccessModal } from "../../components/Modals/LogSavedSuccessModal/LogSavedSuccessModal";
import { ConfirmCancelModal } from "../../components/Modals/ConfirmCancelModal/ConfirmCancelModal";
import { SurgicalAndPatientInfo } from "./sections/surgical_and_patient_info/SurgicalAndPatientInfo";
import { ExaminationsAndInvestigations } from "./sections/examinations_and_investigations/ExaminationsAndInvestigations";
import { CasePlanning } from "./sections/case_planning/CasePlanning";
import { LearningPoints } from "./sections/learning_points/LearningPoints";
import { useAuth } from "../../contexts/AuthContext";
import { postData} from "../../utils/helpers/postData";
import { putData } from "../../utils/helpers/putData";
import { initialFormData } from "./data/ManualEntryInitialFormData";
import { Divider } from "@mui/material";
import "./ManualEntry.css"
import { useLocation } from "react-router-dom";

/**
 * TODO: Add IntersectionObserver scrollable sticky header behaviour
 * https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
 * https://dev.to/dance2die/react-sticky-event-with-intersection-observer-310h
 */
const ManualEntry = () => {
  const { session } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.initialData || initialFormData());

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const getDataValue = (field) => {
    return formData[field];
  };

  const handleSubmit = async () => {
    try {
      const logbookId = location.state?.logbookId;
      if (!logbookId) {
        throw new Error("No logbook ID provided");
      }

      let res;
      if (location.state?.isEditing) {
        // Update existing log
        const logId = location.state?.logData?.id;
        if (!logId) {
          throw new Error("No log ID provided for update");
        }
        res = await putData(
          session?.access_token,
          `logbooks/${logbookId}/logs/${logId}`,
          formData
        );
        console.log("Updated successfully: ", res);
      } else {
        res = await postData(
          session?.access_token,
          `logbooks/${logbookId}/logs`,
          formData
        );
        console.log("Created successfully: ", res);
      }
    } catch (err) {
      console.error("Error submitting: ", err);
    }
  };

  return (
    <div>
      <AppBar />
      <form>
        <div className="manual-entry-container">
          <Divider />
          <h2 className="section-header">
            1. Surgical and Patient Information
          </h2>
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
