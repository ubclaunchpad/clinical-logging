import Grid from "@mui/material/Grid2"
import Rectangles from './temp_assets/rectangles.png'

export const CasePlannings = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid size={5} style={{textAlign: "left"}}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <textarea style={{resize: 'none', border: 'none', backgroundColor: '#EDEDED', width: "100%"}} placeholder="SURGICAL PLAN" rows={16} maxLength={255}>
              </textarea>
            </Grid>
            <Grid size={12}>
              <textarea style={{resize: 'none', border: 'none', backgroundColor: '#EDEDED', width: "100%"}} placeholder="My role:" rows={8} maxLength={255}>
              </textarea>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={1} style={{textAlign: "left"}}>
          <img src={Rectangles} />
        </Grid>
        <Grid size={6} style={{textAlign: "left"}}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <p>OPERATIVE NOTES:</p>
            </Grid>
            <Grid size={6}>
              <p>CPB</p>
            </Grid>
            <Grid size={6}>
              <p>XC</p>
            </Grid>
            <Grid size={3}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="h"/>
            </Grid>
            <Grid size={3}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="m"/>
            </Grid>
            <Grid size={3}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="h"/>
            </Grid>
            <Grid size={3}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="m"/>
            </Grid>
            <Grid size={12}>
              <p>CA</p>
            </Grid>
            <Grid size={3}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="h"/>
            </Grid>
            <Grid size={3}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="m"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}