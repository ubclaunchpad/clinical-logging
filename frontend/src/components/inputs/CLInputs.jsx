import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DEFAULT_HEIGHT = "67px"
const DEFAULT_WIDTH = "100%"
const DEFAULT_PADDING = ""
const DEFAULT_BORDER = ""
const DEFAULT_BORDER_RADIUS = ""
const DEFAULT_BACKGROUND_COLOR = "transparent"

export const CLTextInput = () => {
  return (
    <input type="text"/>
  )
}

export const CLNumberInput = () => {
  return (
    <input type="number"/>
  )
}

export const CLDatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>
  );
}