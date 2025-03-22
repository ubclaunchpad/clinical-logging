import { DataKeys } from "../../data/FormDataNames";
import { CLInputWithUnits } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import LabsFishbones from "../../../../assets/labs-fishbones.png"
import Pulses from "../../../../assets/pulses.png"
import "./ExaminationsAndInvestigations.css"
import { useState } from "react";

export const ExaminationsAndInvestigations = ({ getDataValue, onInputChange }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <p className="input-title-bold">Exam</p>
            </Grid>
            <Grid size={8}>
              <div>
                <p className="input-title">Weight</p>
                <WeightSection getDataValue={getDataValue} onInputChange={onInputChange} />
              </div>
            </Grid>
            <Grid size={4}>
              <div>
                <p className="input-title">BMI</p>
                <input
                  name={DataKeys.BMI}
                  value={getDataValue(DataKeys.BMI)}
                  className="manual-entry-input"
                  type="number"
                  min="0"
                  placeholder="24.2 kg/m2"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Height</p>
                <HeightSection getDataValue={getDataValue} onInputChange={onInputChange} />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Veins</p>
                <input
                  name={DataKeys.VEINS}
                  value={getDataValue(DataKeys.VEINS)}
                  className="manual-entry-input"
                  type="text"
                  min="0"
                  placeholder="Veins"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Allen Test</p>
                <input
                  name={DataKeys.ALLEN_TEST}
                  value={getDataValue(DataKeys.ALLEN_TEST)}
                  className="manual-entry-input"
                  type="text"
                  min="0"
                  placeholder="Allen Test"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={12}>
              {/* Spacer */}
              <div className="spacer-med" />
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">Cath</p>
                <input
                  className="manual-entry-input"
                  type="file"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <p className="input-title-bold">Echo</p>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">EF</p>
                <CLInputWithUnits
                  name={DataKeys.ECHO_EF}
                  value={getDataValue(DataKeys.ECHO_EF)}
                  className="manual-entry-input"
                  units="%"
                  type="number"
                  min="0"
                  placeholder="60"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">RVFx</p>
                <input
                  name={DataKeys.ECHO_RVFX}
                  value={getDataValue(DataKeys.ECHO_RVFX)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Amet pulvinar"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">WMA</p>
                <input
                  name={DataKeys.INVX_WMA}
                  value={getDataValue(DataKeys.INVX_WMA)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Lorem ipsum"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Aorta</p>
                <input
                  name={DataKeys.INVX_AORTA}
                  value={getDataValue(DataKeys.INVX_AORTA)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Morbi nunc enim mauris"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Valves</p>
                <input
                  name={DataKeys.INVX_VALVES}
                  value={getDataValue(DataKeys.INVX_VALVES)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Porttitor purus"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">CXR</p>
                <input
                  name={DataKeys.CXR}
                  value={getDataValue(DataKeys.CXR)}
                  className="manual-entry-input"
                  type="text"
                  placeholder="Morbi nunc enim mauris"
                  onChange={(e) => onInputChange(e.target.name, e.target.value)}
                />
              </div>
            </Grid>
            <Grid size={10}>
              <div>
                <p className="input-title">Labs</p>
                <LabsSection getDataValue={getDataValue} onInputChange={onInputChange}/>
              </div>
            </Grid>
            <Grid size={2}>
              <div>
                <p className="input-title">Pulses</p>
                <PulsesSection getDataValue={getDataValue} onInputChange={onInputChange}/>
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">CT</p>
                <input
                  className="manual-entry-input"
                  type="file"/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const WeightSection = ({ getDataValue, onInputChange }) => {
  const LBS = "lbs";
  const KG = "kg";
  const isImperialKey = DataKeys.IS_WEIGHT_IMPERIAL;
  const weightKey = DataKeys.WEIGHT;
  const conversionFactor = 2.205;
  
  const handleUnitChange = () => {
    getDataValue(isImperialKey) ? onInputChange(isImperialKey, false) : onInputChange(isImperialKey, true);
  }

  const getUnits = () => {
    return getDataValue(isImperialKey) ? LBS : KG;
  }

  const getConversionUnits = () => {
    return getDataValue(isImperialKey) ? KG : LBS;
  }

  const getValue = () => {
    const isImperial = getDataValue(isImperialKey);
    const valueInMetricUnits = getDataValue(weightKey);

    if (valueInMetricUnits == null) return null;
    if (isImperial) {
      return valueInMetricUnits * conversionFactor;
    }

    return valueInMetricUnits;
  }

  const setValue = (value) => {
    const isImperial = getDataValue(isImperialKey);

    if (isImperial) {
      const imperialValue = value / conversionFactor;
      onInputChange(weightKey, imperialValue);
    } else {
      onInputChange(weightKey, value);
    }
  }

  return (
    <div className="input-with-arrow-button-container">
      <div className="input-with-units-flex-container">
        <CLInputWithUnits
          name={weightKey}
          value={getValue()}
          units={getUnits()}
          placeholder={getUnits()}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button className="convert-button" type="button" onClick={handleUnitChange}>
        convert to {getConversionUnits()}
      </button>
    </div>
  )
}

const HeightSection = ({ getDataValue, onInputChange }) => {
  const CM = "cm";
  const FEET = "ft";
  const INCH = "in";
  const conversionFactor = 2.54;
  const isImperialKey = DataKeys.IS_HEIGHT_IMPERIAL;
  const heightKey = DataKeys.HEIGHT;
  const initialDataValue = getDataValue(heightKey);
  const [cmValue, setCmValue] = useState(initialDataValue);
  const [feetValue, setFeetValue] = useState(Math.floor((initialDataValue / conversionFactor) / 12));
  const [inchValue, setInchValue] = useState((initialDataValue / conversionFactor) % 12);

  const handleUnitChange = () => {
    getDataValue(isImperialKey) ? onInputChange(isImperialKey, false) : onInputChange(isImperialKey, true);
  }

  const getConversionUnits = () => {
    return getDataValue(isImperialKey) ? CM : FEET + " " + INCH;
  }

  const setValue = (type, value) => {
    if (type === FEET) {
      setFeetValue(value);
      setCmValue(((value * 12) + inchValue) * conversionFactor)

      console.log(cmValue)
    } else if (type === INCH) {
      setInchValue(value);
      setCmValue(((feetValue * 12) + value) * conversionFactor)
    } else { // using cm
      setCmValue(value);
      setFeetValue(Math.floor((value / conversionFactor) / 12));
      setInchValue((value / conversionFactor) % 12);
    }
    onInputChange(heightKey, cmValue)
  }
  
  return (
    <div className="input-with-arrow-button-container">
      {
        !getDataValue(isImperialKey) &&
        <div className="input-with-units-flex-container">
          <CLInputWithUnits
            name={CM}
            value={cmValue}
            units={CM}
            placeholder={CM}
            onChange={(e) => setValue(e.target.name, e.target.value)}
          />
        </div>
      }
      {
        getDataValue(isImperialKey) &&
        (
          <div className="input-with-units-flex-container">
            <Grid container spacing={1}>
              <Grid size={6}>
                <CLInputWithUnits
                  name={FEET}
                  value={feetValue}
                  units={FEET}
                  placeholder={FEET}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <CLInputWithUnits
                  name={INCH}
                  value={inchValue}
                  units={INCH}
                  placeholder={INCH}
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
        )
      }
      <button className="convert-button" type="button" onClick={handleUnitChange}>
        convert to {getConversionUnits()}
      </button>
    </div>
  )
}

const LabsSection = ({ getDataValue, onInputChange }) => {
  return (
    <div className="labs-section-container">
      <img src={LabsFishbones} className="labs-diagram-image"/>
      <input
        name={DataKeys.LABS_W}
        value={getDataValue(DataKeys.LABS_W)}
        className="labs-text-input labs-text-input-small labs-w-input"
        type="text"
        placeholder="W"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_HB}
        value={getDataValue(DataKeys.LABS_HB)}
        className="labs-text-input labs-text-input-small labs-hb-input"
        type="text"
        placeholder="Hb"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_PLT}
        value={getDataValue(DataKeys.LABS_PLT)}
        className="labs-text-input labs-text-input-small labs-plt-input"
        type="text"
        placeholder="Plt"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_HCT}
        value={getDataValue(DataKeys.LABS_HCT)}
        className="labs-text-input labs-text-input-small labs-hct-input"
        type="text"
        placeholder="Hct"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_NA}
        value={getDataValue(DataKeys.LABS_NA)}
        className="labs-text-input labs-text-input-small labs-na-input"
        type="text"
        placeholder="Na"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_CL}
        value={getDataValue(DataKeys.LABS_CL)}
        className="labs-text-input labs-text-input-small labs-cl-input"
        type="text"
        placeholder="Cl"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_BUN}
        value={getDataValue(DataKeys.LABS_BUN)}
        className="labs-text-input labs-text-input-large labs-bun-input"
        type="text"
        placeholder="BUN"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_GLU}
        value={getDataValue(DataKeys.LABS_GLU)}
        className="labs-text-input labs-text-input-medium labs-glu-input"
        type="text"
        placeholder="Glu"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_CREAT}
        value={getDataValue(DataKeys.LABS_CREAT)}
        className="labs-text-input labs-text-input-large labs-creat-input"
        type="text"
        placeholder="Creat"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_CO2}
        value={getDataValue(DataKeys.LABS_CO2)}
        className="labs-text-input labs-text-input-medium labs-co2-input"
        type="text"
        placeholder="CO2"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
      <input
        name={DataKeys.LABS_K}
        value={getDataValue(DataKeys.LABS_K)}
        className="labs-text-input labs-text-input-small labs-k-input"
        type="text"
        placeholder="K"
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
      />
    </div>
  )
}

const PulsesSection = ({ getDataValue, onInputChange }) => {
  const toggleValue = (value) => {
    return value === 0 ? 1 : 0;
  }

  return (
    <div className="pulses-section-container">
      <img src={Pulses} className="pulses-diagram-image"/>
      <input
        name={DataKeys.PULSES_BOTTOM_LEFT}
        className="labs-checkbox-input bottom-left-checkbox-input"
        type="checkbox"
        checked={getDataValue(DataKeys.PULSES_BOTTOM_LEFT) === 1}
        onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PULSES_BOTTOM_LEFT)))}
      />
      <input
        name={DataKeys.PULSES_TOP_LEFT}
        className="labs-checkbox-input top-left-checkbox-input"
        type="checkbox"
        checked={getDataValue(DataKeys.PULSES_TOP_LEFT) === 1}
        onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PULSES_TOP_LEFT)))}
      />
      <input
        name={DataKeys.PULSES_TOP_RIGHT}
        className="labs-checkbox-input top-right-checkbox-input"
        type="checkbox"
        checked={getDataValue(DataKeys.PULSES_TOP_RIGHT) === 1}
        onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PULSES_TOP_RIGHT)))}
      />
      <input
        name={DataKeys.PULSES_BOTTOM_RIGHT}
        className="labs-checkbox-input bottom-right-checkbox-input"
        type="checkbox"
        checked={getDataValue(DataKeys.PULSES_BOTTOM_RIGHT) === 1}
        onChange={(e) => onInputChange(e.target.name, toggleValue(getDataValue(DataKeys.PULSES_BOTTOM_RIGHT)))}        
      />
    </div>
  )
}