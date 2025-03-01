import { DataKeys } from "../../data/FormDataNames";
import { CLInputWithUnits } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import "./CasePlanning.css"

export const CasePlanning = ({ onInputChange }) => {
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
                units="h"
                placeholder="CPB"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_CPB}
                units="m"
                placeholder="CPB"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
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
                units="h"
                placeholder="XC"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_XC}
                units="m"
                placeholder="XC"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
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
                units="h"
                placeholder="CA"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid size={5.5}>
              <CLInputWithUnits
                name={DataKeys.OP_NOTES_CA}
                units="m"
                placeholder="CA"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
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