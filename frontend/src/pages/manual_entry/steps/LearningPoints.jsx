import Grid from "@mui/material/Grid2"

export const LearningPoints = () => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid size={6}>
          <textarea style={{resize: 'none', width: '100%', border: 'none', backgroundColor: '#EDEDED'}} placeholder="Post-operative Course" rows={20} maxLength={255}>
          </textarea>
        </Grid>
        <Grid size={6}>
          <textarea style={{resize: 'none', width: '100%', border: 'none', backgroundColor: '#EDEDED'}} placeholder="Learning Points, Key Lessons" rows={20} maxLength={255}>
          </textarea>
        </Grid>
      </Grid>
    </div>
  )
}