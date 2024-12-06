import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';

export const LearningPoints = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <div>
            <p className="input-title-bold">Post-operative Course</p>
            <textarea className="manual-entry-text-area" rows="6" placeholder="Post-operative Course"/>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <p className="input-title-bold">Learning Points, Key Lessons</p>
            <textarea className="manual-entry-text-area" rows="6" placeholder="Learning Points, Key Lessons"/>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}