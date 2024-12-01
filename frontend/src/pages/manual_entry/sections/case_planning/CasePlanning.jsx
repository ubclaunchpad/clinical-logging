import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import "./CasePlanning.css"

export const CasePlanning = () => {
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
            <Grid size={12}>
              <p className="input-title-bold">Operative Notes</p>
            </Grid>
            <Grid size={1}>
              <div className="operative-notes-input-title-container">
                <p className="input-title">CPB</p>
              </div>
            </Grid>
            <Grid size={5.5}>
              <input className="manual-entry-input" type="number" placeholder="CPB"/>
            </Grid>
            <Grid size={5.5}>
              <input className="manual-entry-input" type="number" placeholder="CPB"/>
            </Grid>
            <Grid size={1}>
              <div className="operative-notes-input-title-container">
                <p className="input-title">XC</p>
              </div>
            </Grid>
            <Grid size={5.5}>
              <input className="manual-entry-input" type="number" placeholder="XC"/>
            </Grid>
            <Grid size={5.5}>
              <input className="manual-entry-input" type="number" placeholder="XC"/>
            </Grid>
            <Grid size={1}>
              <div className="operative-notes-input-title-container">
                <p className="input-title">CA</p>
              </div>
            </Grid>
            <Grid size={5.5}>
              <input className="manual-entry-input" type="number" placeholder="CA"/>
            </Grid>
            <Grid size={5.5}>
              <input className="manual-entry-input" type="number" placeholder="CA"/>
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
            <Grid size={12}>
              <div>
                <p className="input-title-bold">My Role</p>
                <textarea className="case-planning-text-area" placeholder="My Role"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}