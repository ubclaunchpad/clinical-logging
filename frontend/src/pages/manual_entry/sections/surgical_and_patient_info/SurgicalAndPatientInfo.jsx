import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import Radio from "@mui/material/Radio";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import "./SurgicalAndPatientInfo.css"

export const SurgicalAndPatientInfo = () => {
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
            <Grid size={12}>
              <p className="input-title-bold">PMHx</p>
            </Grid>
            <Grid size={12}>
              <PMHxSection />
            </Grid>
            <Grid size={12}>
              <MedsLastDoseSection />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <div>
              <p className="input-title">Patient ID</p>
              <input className="manual-entry-input" type="text" placeholder="7654321"/>
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <p className="input-title">Age</p>
              <input className="manual-entry-input" type="number" placeholder="40"/>
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <p className="input-title">Gender</p>
              <input className="manual-entry-input" type="number" placeholder="Select"/>
            </div>
          </Grid>
          <Grid size={12}>
            <div>
              <p className="input-title">Indication for Surgery/Reason for Referral</p>
              <input className="manual-entry-input" type="text" placeholder="Indication for Surgery/Reason for Referral"/>
            </div>
          </Grid>
          <Grid size={12}>
            <p className="input-title-bold">Social</p>
          </Grid>
          <Grid size={12}>
            <div>
              <p className="input-title">EtOH</p>
              <input className="manual-entry-input" type="text" placeholder="Lorem ipsum"/>
            </div>
          </Grid>
          <Grid size={12}>
            <div>
              <p className="input-title">Drugs</p>
              <input className="manual-entry-input" type="text" placeholder="Amet pulvinar"/>
            </div>
          </Grid>
          <Grid size={12}>
            <div>
              <p className="input-title">Smoking</p>
              <input className="manual-entry-input" type="text" placeholder="Neque mauris"/>
            </div>
          </Grid>
          <Grid size={12}>
            <div>
              <p className="input-title">Allergies</p>
              <textarea className="surgical-patient-info-textarea" placeholder="Massa odio vel sed."/>
            </div>
          </Grid>
          <Grid size={12}>
            <div className="radio-label-container">
              <Radio sx={{ padding: 0 }} />
              <p className="input-title">None</p>
            </div>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const PMHxSection = () => {
  return (
    <div></div>
  )
}

const MedsLastDoseSection = () => {
  const [medsLastDoses, setMedsLastDoses] = useState([0])
  
  const handleAddMed = () => {
    setMedsLastDoses(prevState => [...prevState, prevState.length])
  }
  const handleRemoveMed = () => {
    if (medsLastDoses.length === 1) {
      return
    }
    setMedsLastDoses(prevState => prevState.slice(0, prevState.length - 1))
  }

  return (
    <div>
      {medsLastDoses.map((_, i) => {
        return (
          <div key={i}>
            {
              i > 0 &&
              (
                <div className="meds-last-dose-button-container">
                  <button className="meds-last-dose-button" onClick={handleRemoveMed}>
                    <MinusCircleIcon className="meds-last-dose-icon"/>
                  </button>
              </div>
              )
            }
            <Grid container spacing={1}>
              <Grid size={6}>
                <div>
                  <p className="input-title">Name</p>
                  <input className="manual-entry-input" type="text" placeholder="1234567"/>
                </div>
              </Grid>
              <Grid size={6}>
                <div>
                  <p className="input-title">Dose</p>
                  <input className="manual-entry-input" type="text" placeholder="Adult cardiac"/>
                </div>
              </Grid>
              <Grid size={6}>
                <div>
                  <p className="input-title">Frequency</p>
                  <input className="manual-entry-input" type="text" placeholder="Adult cardiac"/>
                </div>
              </Grid>
              <Grid size={6}>
                <div>
                  <p className="input-title">Method of delivery</p>
                  <input className="manual-entry-input" type="text" placeholder="Adult cardiac"/>
                </div>
              </Grid>
            </Grid>
            {
              i === medsLastDoses.length - 1 &&
              (
                <div className="meds-last-dose-button-container">
                  <button className="meds-last-dose-button" onClick={handleAddMed}>
                    <PlusCircleIcon className="meds-last-dose-icon"/>
                  </button>
                </div>
              )
            }
          </div>
        )
      })}
    </div>
  )
}