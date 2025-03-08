import { DataKeys } from "../../data/FormDataNames";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';

export const LearningPoints = ({ getDataValue, onInputChange }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <div>
            <p className="input-title-bold">Post-operative Course</p>
            <textarea
              name={DataKeys.POST_OP}
              value={getDataValue(DataKeys.POST_OP)}
              className="manual-entry-text-area"
              rows="6"
              placeholder="Post-operative Course"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <p className="input-title-bold">Learning Points, Key Lessons</p>
            <textarea
              name={DataKeys.LEARNING_POINTS}
              className="manual-entry-text-area"
              rows="6"
              placeholder="Learning Points, Key Lessons"
              onChange={(e) => onInputChange(e.target.name, e.target.value)}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}