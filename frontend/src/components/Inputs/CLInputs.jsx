import "./CLInputs.css"

export const CLInputWithUnits = (
  {
    placeholder,
    units
  }
) => {
  return (
    <div className="input-with-units-container">
      <input
        className="input-with-units"
        type="number"
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