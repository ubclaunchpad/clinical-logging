import { AppBar } from "../../components/AppBar/AppBar";
import { LogSavedSuccessModal } from "../../components/Modals/LogSavedSuccessModal/LogSavedSuccessModal";
import { ConfirmCancelModal } from "../../components/Modals/ConfirmCancelModal/ConfirmCancelModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import "./ManualEntry.css"

/**
 * TODO: Add IntersectionObserver scrollable sticky header behaviour
 * https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
 * https://dev.to/dance2die/react-sticky-event-with-intersection-observer-310h
 */
const ManualEntry = () => {

  return (
    <div>
      <AppBar />
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
        <ConfirmCancelModal />
        <LogSavedSuccessModal />
      </div>
    </div>
  );
};

const SurgicalAndPatientInfo = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={6}>
              <div>
                <p className="input-title">Case no.</p>
                <input className="text-input" placeholder="1234567"/>
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Type</p>
                <input className="text-input" placeholder="Adult cardiac"/>
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Surgeon</p>
                <input className="text-input" placeholder="Surgeon name"/>
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">OR Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{ borderRadius: "100px" }}/>
                </LocalizationProvider>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <div>
            <p className="input-title">Patient ID</p>
            <input className="text-input" placeholder="7654321"/>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

const ExaminationsAndInvestigations = () => {
  return (
    <div>
      <textarea className="case-planning-text-area"/>
    </div>
  )
}

const CasePlanning = () => {
  return (
    <div>
      <textarea className="case-planning-text-area"/>
    </div>
  )
}

const LearningPoints = () => {
  return (
    <div>
      <textarea className="learning-points-text-area"/>
      <textarea className="learning-points-text-area"/>
    </div>
  )
}

export default ManualEntry;
