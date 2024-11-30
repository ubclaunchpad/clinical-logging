import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';

export const ExaminationsAndInvestigations = () => {
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
            <Grid size={12}>
              <div>
                <p className="input-title-bold">Cath</p>
                <input className="manual-entry-input" type="file"/>
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
            <Grid size={12}>
              <div>
                <p className="input-title-bold">CT</p>
                <input className="manual-entry-input" type="file"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}