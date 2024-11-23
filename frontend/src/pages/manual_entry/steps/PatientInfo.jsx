import Grid from "@mui/material/Grid2"

export const PatientInfo = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid size={6} style={{textAlign: "left"}}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="Patient ID"/>
            </Grid>
            <Grid size={4}>
              <input type="number" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Age"/>
            </Grid>
            <Grid size={4}>
              <p style={{margin: "0px"}}>Gender</p>
            </Grid>
            <Grid size={8} style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <div style={{display: "flex", justifyContent: "center", }}>
                <input type="radio" checked/>
                <label>Male</label>
                <input type="radio"/>
                <label>Female</label>
                <input type="radio"/>
                <label>Other</label>
              </div>
            </Grid>
            <Grid size={12}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="HPI"/>
            </Grid>
            <Grid size={12}>
              <p style={{margin: "0px"}}>Social</p>
            </Grid>
            <Grid size={4}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}} placeholder="EtOH"/>
            </Grid>
            <Grid size={4}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Drugs"/>
            </Grid>
            <Grid size={4}>
              <input type="text" style={{border: 'none', backgroundColor: '#EDEDED', width: "100%", height: "40px"}}  placeholder="Smoking"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6} style={{textAlign: "left"}}>
          <Grid size={12}>
            <p style={{margin: '0px'}}>PMHx</p>
          </Grid>
          <Grid size={12}>
            <div style={{marginTop: '15px', marginBottom: '15px'}}>
              <input type="radio" checked/>
              <label>HTN</label>
              <input type="radio"/>
              <label>DM II</label>
              <input type="radio"/>
              <label>DLP</label>
              <input type="radio"/>
              <label>CVA</label>
              <input type="radio"/>
              <label>Other</label>
            </div>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={6}>
              <textarea style={{resize: 'none', border: 'none', backgroundColor: '#EDEDED', width: "100%"}} placeholder="Meds (last dose)" rows={18} maxLength={255}>
              </textarea>
            </Grid>
            <Grid size={6}>
              <textarea style={{resize: 'none', border: 'none', backgroundColor: '#EDEDED', width: "100%"}} placeholder="Allergies" rows={16} maxLength={255}>
              </textarea>
              <input type="radio"/>
              <label>None</label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}