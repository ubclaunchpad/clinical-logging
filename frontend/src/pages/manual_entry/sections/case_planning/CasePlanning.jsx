import { DataKeys } from "../../data/FormDataNames";
import { CLInputWithUnits } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import "./CasePlanning.css"

export const CasePlanning = ({ getDataValue, onInputChange }) => {
  const HOUR = "h";
  const MINUTE = "m";

  const getHours = (time) => {
    return time == null ? null : Number(time.slice(0, time.indexOf("h")));
  }

  const getMinutes = (time) => {
    return time == null ? null : Number(time.slice(time.indexOf(" ") + 1, time.indexOf("m")));
  }

  const updateTime = (type, name, value) => {
    const dataValue = getDataValue(name);
    const defaultH = 0;
    const defaultM = 0;
    let newTime = "";

    if (dataValue == null) {
      if (type === HOUR) {
        newTime = value + "h" + " " + defaultM + "m";
      } else {
        newTime = defaultH + "h" + " " + value + "m";
      }
    } else {
      const indexOfH = dataValue.indexOf("h");
      const indexOfM = dataValue.indexOf("m");
      let currHour = parseInt(dataValue.slice(0, indexOfH).trim()) || defaultH;
      let currMinute = parseInt(dataValue.slice(indexOfH + 1, indexOfM).trim()) || defaultM;
      
      if (type === HOUR) {
        currHour = value;
      } else if (type === MINUTE) {
        currMinute = value;
      }
  
      newTime = currHour + "h " + currMinute + "m";
    }

    onInputChange(name, newTime);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">Surgical Plan</p>
                <textarea
                  name={DataKeys.SURGICAL_PLAN}
                  value={getDataValue(DataKeys.SURGICAL_PLAN)}
                  className="manual-entry-text-area"
                  rows="9"
                  placeholder="Surgical Plan"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <p className="input-title-bold">Operative Notes</p>
            </Grid>
            <Grid size={1}>
              <div className="operative-notes-input-title-container">
                <p className="input-title">CPB</p>
              </div>
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_CPB}
                value={getHours(getDataValue(DataKeys.OP_NOTES_CPB))}
                units="h"
                placeholder="CPB"
                onChange={(e) => updateTime(HOUR, e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_CPB}
                value={getMinutes(getDataValue(DataKeys.OP_NOTES_CPB))}
                units="m"
                placeholder="CPB"
                onChange={(e) => updateTime(MINUTE, e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={1}>
              <div className="operative-notes-input-title-container">
                <p className="input-title">XC</p>
              </div>
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_XC}
                value={getHours(getDataValue(DataKeys.OP_NOTES_XC))}
                units="h"
                placeholder="XC"
                onChange={(e) => updateTime(HOUR, e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_XC}
                value={getMinutes(getDataValue(DataKeys.OP_NOTES_XC))}
                units="m"
                placeholder="XC"
                onChange={(e) => updateTime(MINUTE, e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={1}>
              <div className="operative-notes-input-title-container">
                <p className="input-title">CA</p>
              </div>
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_CA}
                value={getHours(getDataValue(DataKeys.OP_NOTES_CA))}
                units="h"
                placeholder="CA"
                onChange={(e) => updateTime(HOUR, e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_CA}
                value={getMinutes(getDataValue(DataKeys.OP_NOTES_CA))}
                units="m"
                placeholder="CA"
                onChange={(e) => updateTime(MINUTE, e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <div>
                <p className="input-title">1° operator</p>
                <input
                  name={DataKeys.FIRST_OP_FLAG}
                  value={getDataValue(DataKeys.FIRST_OP_FLAG)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="7654321"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Issue - OR</p>
                <input
                  name={DataKeys.OR_FLAG}
                  value={getDataValue(DataKeys.OR_FLAG)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="7654321"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Issue - Post</p>
                <input
                  name={DataKeys.ISSUE_FLAG}
                  value={getDataValue(DataKeys.ISSUE_FLAG)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Adult cardiac"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)} />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Flag for F/U</p>
                <input
                name={DataKeys.FU_FLAG}
                value={getDataValue(DataKeys.FU_FLAG)}
                className="manual-entry-input"
                type="text"
                placeholder="7654321"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">My Role</p>
                <textarea
                  name={DataKeys.MY_ROLE}
                  value={getDataValue(DataKeys.MY_ROLE)}
                  className="manual-entry-text-area"
                  rows="6"
                  placeholder="My Role"
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