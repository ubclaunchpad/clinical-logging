import { useState } from "react";
import { CLDatePickerInput, CLSelectInput } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MenuItem from "@mui/material/MenuItem";
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
                <CLDatePickerInput />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">HPI</p>
                <textarea className="manual-entry-text-area" rows="3" placeholder="HPI"/>
              </div>
            </Grid>
            <Grid size={12}>
              <p className="input-title-bold">PMHx</p>
              <PMHxSection />
            </Grid>
            <Grid size={12}>
              <p className="input-title-bold">Meds (last dose)</p>
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
              <input className="manual-entry-input" type="number" min="0" placeholder="40"/>
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <p className="input-title">Gender</p>
              <GenderSection />
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
              <textarea className="manual-entry-text-area" rows="4" placeholder="Massa odio vel sed."/>
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

const GenderSection = () => {
  const MALE = "male"
  const FEMALE = "female"
  const OTHER = "other"
  const [gender, setGender] = useState(MALE)

  const handleChange = (event) => {
    setGender(event.target.value)
  }

  return (
    <div>
      <CLSelectInput
        value={gender}
        onChange={handleChange}
      >
        <MenuItem value={MALE}>
          Male
        </MenuItem>
        <MenuItem value={FEMALE}>
          Female
        </MenuItem>
        <MenuItem value={OTHER}>
          Other
        </MenuItem>
      </CLSelectInput>
    </div>
  )
}

const PMHxSection = () => {
  const HTN = "HTN"
  const DMII = "DM II"
  const DLT = "DLP"
  const CVA = "CVA"
  const [selected, setSelected] = useState("")

  const handleChange = (event) => {
    setSelected(event.target.value)
  }

  return (
    <div>
      <RadioGroup
        value={selected}
        onChange={handleChange}
      >
        <Grid container spacing={1}>
          <Grid size={6}>
            <div className="radio-label-container">
              <Radio
                value={HTN}
                sx={{ padding: 0 }}
              />
              <p className="input-title">HTM</p>
            </div>
          </Grid>
          <Grid size={6}>
            <div className="radio-label-container">
              <Radio
                value={DMII}
                sx={{ padding: 0 }}
              />
              <p className="input-title">DM II</p>
            </div>
          </Grid>
          <Grid size={6}>
            <div className="radio-label-container">
              <Radio
                value={DLT}
                sx={{ padding: 0 }}
              />
              <p className="input-title">DLP</p>
            </div>
          </Grid>
          <Grid size={6}>
            <div className="radio-label-container">
              <Radio
                value={CVA}
                sx={{ padding: 0 }}
              />
              <p className="input-title">CVA</p>
            </div>
          </Grid>
        </Grid>
      </RadioGroup>
    </div>
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