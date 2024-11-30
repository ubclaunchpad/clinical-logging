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
        <div className="manual-entry-buttons-footer">
          <ConfirmCancelModal />
          <LogSavedSuccessModal />
        </div>
      </div>
    </div>
  );
};

const SurgicalAndPatientInfo = () => {
  // const medsArray = []

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={6}>
              <div>
                <p className="input-title">Case no.</p>
                <input className="manual-entry-input" type="text" placeholder="1234567"/>
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Type</p>
                <input className="manual-entry-input" type="text" placeholder="Adult cardiac"/>
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Surgeon</p>
                <input className="manual-entry-input" type="text" placeholder="Surgeon name"/>
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
            <Grid size={12}>
              <div>
                <p className="input-title-bold">HPI</p>
                <textarea className="surgical-patient-info-textarea" placeholder="HPI"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <div>
            <p className="input-title">Patient ID</p>
            <input className="manual-entry-input" type="text" placeholder="7654321"/>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

const ExaminationsAndInvestigations = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <p className="input-title-bold">Exam</p>
            </Grid>
            <Grid size={8}>
              <div>
                <p className="input-title">Weight</p>
                <input className="manual-entry-input" type="number" placeholder="weight" />
              </div>
            </Grid>
            <Grid size={8}>
              <div>
                <p className="input-title">Height</p>
                <input className="manual-entry-input" type="number" placeholder="Height" />
              </div>
            </Grid>
            <Grid size={4}>
              <div>
                <p className="input-title">BMI</p>
                <input className="manual-entry-input" type="number" placeholder="24.2 kg/m2" />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Veins</p>
                <input className="manual-entry-input" type="number" placeholder="Veins" />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Allen Test</p>
                <input className="manual-entry-input" type="number" placeholder="Allen Test" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <p className="input-title-bold">Echo</p>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">EF</p>
                <input className="manual-entry-input" type="number" placeholder="60%" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">RVFx</p>
                <input className="manual-entry-input" type="text" placeholder="Amet pulvinar" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">WMA</p>
                <input className="manual-entry-input" type="text" placeholder="Lorem ipsum" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Aorta</p>
                <input className="manual-entry-input" type="text" placeholder="Morbi nunc enim mauris" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Valves</p>
                <input className="manual-entry-input" type="text" placeholder="Porttitor purus" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">CXR</p>
                <input className="manual-entry-input" type="text" placeholder="Morbi nunc enim mauris" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const CasePlanning = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">Surgical Plan</p>
                <textarea className="case-planning-text-area" placeholder="Surgical Plan"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div>
                <p className="input-title">1° operator</p>
                <input className="manual-entry-input" type="text" placeholder="7654321"/>
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Issue - OR</p>
                <input className="manual-entry-input" type="text" placeholder="7654321"/>
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Issue - Post</p>
                <input className="manual-entry-input" type="text" placeholder="Adult cardiac"/>
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Flag for F/U</p>
                <input className="manual-entry-input" type="text" placeholder="7654321"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const LearningPoints = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <div>
            <p className="input-title-bold">Post-operative Course</p>
            <textarea className="learning-points-text-area" placeholder="Post-operative Course"/>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <p className="input-title-bold">Learning Points, Key Lessons</p>
            <textarea className="learning-points-text-area" placeholder="Learning Points, Key Lessons"/>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ManualEntry;
