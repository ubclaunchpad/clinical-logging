import Grid from "@mui/material/Grid2"
import Fishbones from './temp_assets/fishbones.png'
import Pulses from './temp_assets/pulses.png'

export const Investigations = () => {
  return (
    <Grid container spacing={8}>
      <Grid size={6} style={{textAlign: "left"}}>
        <p>EXAM</p>
        <Grid container spacing={2}>
          <Grid size={4}>
            <input type="number" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="Weight (kg)"/>
          </Grid>
          <Grid size={4}>
            <input type="number" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Height (cm)"/>
          </Grid>
          <Grid size={4}>
            <input type="number" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="BMI (kg/m2)"/>
          </Grid>
          <Grid size={6}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="Veins"/>
          </Grid>
          <Grid size={6}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Allen Test"/>
          </Grid>
          <Grid size={6}>
            <img src={Pulses} style={{width: '18rem'}}/>
          </Grid>
          <Grid size={6}>
            <p style={{margin: "0px"}}>Cath:</p>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={6} style={{textAlign: "left"}}>
        <p>INVx</p>
        <Grid container spacing={2} style={{marginBottom: '20px'}}>
          <Grid size={4}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="Echo"/>
          </Grid>
          <Grid size={4}>
            <input type="number" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="EF (%)"/>
          </Grid>
          <Grid size={4}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="RVFx"/>
          </Grid>
          <Grid size={4}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="WMA"/>
          </Grid>
          <Grid size={4}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Aorta"/>
          </Grid>
          <Grid size={4}>
            <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Valves"/>
          </Grid>
          <Grid size={6}>
            <p style={{margin: "0px"}}>CT:</p>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
          </Grid>
          <Grid size={6}>
            <img src={Fishbones} style={{width: '18rem'}}/>
          </Grid>
          <Grid size={12}>
            <div style={{display: "flex", alignItems: "center"}}>
              <p>CXR</p>
              <input type="radio" checked/>
              <label>Female</label>
              <input type="radio"/>
              <label>Other</label>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}