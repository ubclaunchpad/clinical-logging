import { AppBar } from "../../components/AppBar/AppBar";
import { LogSavedSuccessModal } from "../../components/Modals/LogSavedSuccessModal/LogSavedSuccessModal";
import { ConfirmCancelModal } from "../../components/Modals/ConfirmCancelModal/ConfirmCancelModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider } from "@mui/material";
import "./ManualEntry.css"

const ManualEntry = () => {
  return (
    <div>
      <AppBar />
      <div className="manual-entry-container">
        <Divider />
        <h2>1. Surgical and Patient Information</h2>
        <p className="input-title">Case no.</p>
        <input className="text-input" placeholder="1234567"/>
        <input className="text-input" placeholder="1234567"/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
        <h2>2. Examinations and Investigations</h2>
        <h2>3. Case Planning</h2>
        <textarea className="case-planning-text-area"/>
        <h2>4. Learning Points</h2>
        <textarea className="learning-points-text-area"/>
        <textarea className="learning-points-text-area"/>
        <ConfirmCancelModal />
        <LogSavedSuccessModal />
      </div>
    </div>
  );
};

export default ManualEntry;
