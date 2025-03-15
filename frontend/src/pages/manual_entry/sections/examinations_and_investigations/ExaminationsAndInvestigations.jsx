import { useState } from "react";
import { DataKeys } from "../../data/FormDataNames";
import { CLInputWithUnits } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import LabsFishbones from "../../../../assets/labs-fishbones.png"
import Pulses from "../../../../assets/pulses.png"
import "./ExaminationsAndInvestigations.css"

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
                <WeightSection />
              </div>
            </Grid>
            <Grid size={4}>
              <div>
                <p className="input-title">BMI</p>
                <input className="manual-entry-input" type="number" min="0" placeholder="24.2 kg/m2" />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Height</p>
                <HeightSection />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Veins</p>
                <input
                  name={DataKeys.VEINS}
                  value={getDataValue(DataKeys.VEINS)}
                  className="manual-entry-input"
                  type="number"
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

const WeightSection = () => {
  const METRIC = "metric"
  const IMPERIAL = "imperial"
  const [unitSystem, setUnitSystem] = useState(METRIC)
  
  const handleUnitChange = () => {
    if (unitSystem === METRIC) {
      setUnitSystem(IMPERIAL)
    } else {
      setUnitSystem(METRIC)
    }
  }

  const getUnits = () => {
    return unitSystem === METRIC ? "kg" : "lbs"
  }

  return (
    <div className="input-with-arrow-button-container">
      <div className="input-with-units-flex-container">
        <CLInputWithUnits units={getUnits()} placeholder={getUnits()} />
      </div>
      <button className="convert-button" type="button" onClick={handleUnitChange}>
        convert to {getUnits()}
      </button>
    </div>
  )
}

const HeightSection = () => {
  const METRIC = "metric"
  const IMPERIAL = "imperial"
  const [unitSystem, setUnitSystem] = useState(METRIC)

  const handleUnitChange = () => {
    if (unitSystem === METRIC) {
      setUnitSystem(IMPERIAL)
    } else {
      setUnitSystem(METRIC)
    }
  }

  const getUnits = () => {
    return unitSystem === METRIC ? "cm" : "ft in"
  }
  
  return (
    <div className="input-with-arrow-button-container">
      {
        unitSystem === METRIC &&
        <div className="input-with-units-flex-container">
          <CLInputWithUnits units="cm" placeholder="cm" />
        </div>
      }
      {
        unitSystem === IMPERIAL &&
        (
          <div className="input-with-units-flex-container">
            <Grid container spacing={1}>
              <Grid size={6}>
                <CLInputWithUnits units="ft" placeholder="ft" />
              </Grid>
              <Grid size={6}>
                <CLInputWithUnits units="in" placeholder="in" />
              </Grid>
            </Grid>
          </div>
        )
      }
      <button className="convert-button" type="button" onClick={handleUnitChange}>
        convert to {getUnits()}
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