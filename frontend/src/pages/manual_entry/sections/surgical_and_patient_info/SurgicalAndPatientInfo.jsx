import { useState } from "react";
import { DataKeys } from "../../data/FormDataNames";
import { CLDatePickerInput, CLSelectInput } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import { Checkbox } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./SurgicalAndPatientInfo.css"

export const SurgicalAndPatientInfo = ({ getDataValue, onInputChange }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={6}>
              <div>
                <p className="input-title">Case no.*</p>
                <input
                  name={DataKeys.CASE_NO}
                  value={getDataValue(DataKeys.CASE_NO)}
                  className="manual-entry-input"
                  type="number"
                  placeholder="1234567"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Type*</p>
                <input
                  name={DataKeys.TYPE}
                  value={getDataValue(DataKeys.TYPE)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Adult cardiac"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Surgeon*</p>
                <input
                  name={DataKeys.SURGEON}
                  value={getDataValue(DataKeys.SURGEON)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Surgeon name"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">OR Date*</p>
                <CLDatePickerInput />
              </div>
            </Grid>
            {/* Spacer */}
            <div className="spacer-sm" />
            <Grid size={12}>
              <p className="input-title-bold">Social</p>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">EtOH</p>
                <input
                  name={DataKeys.ETOH}
                  value={getDataValue(DataKeys.ETOH)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Lorem ipsum"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Drugs</p>
                <input
                  name={DataKeys.DRUGS}
                  value={getDataValue(DataKeys.DRUGS)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Amet pulvinar"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Smoking</p>
                <input
                  name={DataKeys.SMOKING}
                  value={getDataValue(DataKeys.SMOKING)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Neque mauris"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              {/* Spacer */}
              <div className="spacer-sm" />
              <div>
                <p className="input-title-bold">PMHx*</p>
                <PMHxSection getDataValue={getDataValue} onInputChange={onInputChange} />
              </div>
            </Grid>
            <Grid size={12}>
              <p className="input-title-bold">Meds (last dose)</p>
            </Grid>
            <Grid size={12}>
              <textarea
                name={DataKeys.MEDICINE}
                value={getDataValue(DataKeys.MEDICINE)}
                className="manual-entry-text-area"
                rows="3"
                placeholder="Lorem ipsum"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div>
                <p className="input-title">Patient ID*</p>
                <input
                  name={DataKeys.PATIENT_ID}
                  value={getDataValue(DataKeys.PATIENT_ID)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="7654321"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Age*</p>
                <input
                  name={DataKeys.AGE}
                  value={getDataValue(DataKeys.AGE)}
                  className="manual-entry-input"
                  type="number"
                  min="0"
                  placeholder="40"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Gender*</p>
                <GenderSection />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Indication for Surgery/Reason for Referral*</p>
                <input
                  name={DataKeys.REFERRAL_REASON}
                  value={getDataValue(DataKeys.REFERRAL_REASON)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Indication for Surgery/Reason for Referral"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            {/* Spacer */}
            <div className="spacer-sm" />
            <Grid size={12}>
              <div>
                <p className="input-title-bold">HPI*</p>
                <textarea
                  name={DataKeys.HPI}
                  value={getDataValue(DataKeys.HPI)}
                  className="manual-entry-text-area"
                  rows="3"
                  placeholder="HPI"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            {/* Spacer */}
            <div className="spacer-sm" />
            <Grid size={12}>
              <div>
                <p className="input-title-bold">Allergies</p>
                <input
                  name={DataKeys.ALLERGIES}
                  value={getDataValue(DataKeys.ALLERGIES)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Massa odio vel sed."
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
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
  const [gender, setGender] = useState(null)

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

const PMHxSection = ({ getDataValue, onInputChange }) => {
  const HTN = "HTN"
  const DMII = "DM II"
  const DLT = "DLP"
  const CVA = "CVA"

  const toggleValue = (value) => {
    return value === 0 ? 1 : 0;
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid size={3}>
          <div className="checkbox-label-container">
            <Checkbox
              name={DataKeys.PMHX_HTM}
              value={HTN}
              sx={{ padding: 0, color: "#244B94" }}
              checked={getDataValue(DataKeys.PMHX_HTM) === 1}
              onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PMHX_HTM)))}   
            />
            <p className="input-title">HTM</p>
          </div>
        </Grid>
        <Grid size={3}>
          <div className="checkbox-label-container">
          <Checkbox
              name={DataKeys.PMHX_DMII}
              value={DMII}
              sx={{ padding: 0, color: "#244B94" }}
              checked={getDataValue(DataKeys.PMHX_DMII) === 1}
              onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PMHX_DMII)))}   
            />
            <p className="input-title">DM II</p>
          </div>
        </Grid>
        <Grid size={3}>
          <div className="checkbox-label-container">
            <Checkbox
              name={DataKeys.PMHX_DLT}
              value={DLT}
              sx={{ padding: 0, color: "#244B94" }}
              checked={getDataValue(DataKeys.PMHX_DLT) === 1}
              onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PMHX_DLT)))}   
            />
            <p className="input-title">DLP</p>
          </div>
        </Grid>
        <Grid size={3}>
          <div className="checkbox-label-container">
            <Checkbox
              name={DataKeys.PMHX_CVA}
              value={CVA}
              sx={{ padding: 0 }}
              checked={getDataValue(DataKeys.PMHX_CVA) === 1}
              onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PMHX_CVA)))}   
            />
            <p className="input-title">CVA</p>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
