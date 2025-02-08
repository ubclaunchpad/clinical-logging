import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from "@mui/material/Select";
import "./CLInputs.css"

export const CLInputWithUnits = ({
    placeholder,
    units
}) => {
  return (
    <div className="input-with-units-container">
      <input
        className="input-with-units"
        type="number"
        min="0"
        placeholder={placeholder}
      />
      <div className="input-units">
        <p className="input-units-text">
          {units}
        </p>
      </div>
    </div>
  )
}

export const CLSelectInput = ({
  value,
  onChange,
  children,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      className="select-dropdown"
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: "#BAC1D0",
          borderRadius: "16px",
        },
        '& .MuiSelect-select': {
          padding: "14px",
          fontSize: "13px",
        },
      }}
    >
      {children}
    </Select>
  )
}

export const CLDatePickerInput = ({ name, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name={name}
        className="date-picker"
        sx={{
          '& .MuiInputBase-root': {
            height: "50px",
            fontSize: "13px",
            borderColor: "#BAC1D0",
            borderRadius: "16px",
          },
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}