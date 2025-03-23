import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from "@mui/material/Select";
import "./CLInputs.css"

export const CLInputWithUnits = ({
    name,
    value,
    placeholder,
    units,
    onChange
}) => {
  return (
    <div className="input-with-units-container">
      <input
        name={name}
        value={value}
        className="input-with-units"
        type="number"
        min="0"
        placeholder={placeholder}
        onChange={onChange}
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

export const CLDatePickerInput = ({
  name,
  value,
  onChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="date-picker"
        name={name}
        value={value}
        onChange={(newValue) => onChange(name, newValue)}
        sx={{
          '& .MuiInputBase-root': {
            height: "50px",
            fontSize: "13px",
            borderColor: "#BAC1D0",
          },
          '&.MuiTextField-root .MuiOutlinedInput-input': {
            padding: "18px",
          },
        }}
      />
    </LocalizationProvider>
  )
}