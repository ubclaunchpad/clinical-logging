import { useState } from "react";
import { CLInputWithUnits } from "../../../../components/Inputs/CLInputs";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import Radio from "@mui/material/Radio";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import LabsFishbones from "../../../../assets/labs-fishbones.png"
import Pulses from "../../../../assets/pulses.png"
import "./ExaminationsAndInvestigations.css"

export const ExaminationsAndInvestigations = () => {
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
            <Grid size={8}>
              <div>
                <p className="input-title">Height</p>
                <HeightSection />
              </div>
            </Grid>
            <Grid size={4}>
              <div>
                <p className="input-title">BMI</p>
                <input className="manual-entry-input" type="number" placeholder="24.2 kg/m2" />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Veins</p>
                <input className="manual-entry-input" type="number" placeholder="Veins" />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title">Allen Test</p>
                <input className="manual-entry-input" type="number" placeholder="Allen Test" />
              </div>
            </Grid>
            <Grid size={12}>
              {/* Spacer */}
              <div style={{height: "36px"}}></div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">Cath</p>
                <input className="manual-entry-input" type="file"/>
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
                <input className="manual-entry-input" type="number" placeholder="60%" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">RVFx</p>
                <input className="manual-entry-input" type="text" placeholder="Amet pulvinar" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">WMA</p>
                <input className="manual-entry-input" type="text" placeholder="Lorem ipsum" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Aorta</p>
                <input className="manual-entry-input" type="text" placeholder="Morbi nunc enim mauris" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">Valves</p>
                <input className="manual-entry-input" type="text" placeholder="Porttitor purus" />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <p className="input-title">CXR</p>
                <input className="manual-entry-input" type="text" placeholder="Morbi nunc enim mauris" />
              </div>
            </Grid>
            <Grid size={8}>
              <div>
                <p className="input-title">Labs</p>
                <LabsSection />
              </div>
            </Grid>
            <Grid size={4}>
              <div>
                <p className="input-title">Pulses</p>
                <PulsesSection />
              </div>
            </Grid>
            <Grid size={12}>
              <div>
                <p className="input-title-bold">CT</p>
                <input className="manual-entry-input" type="file"/>
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
        <CLInputWithUnits units={getUnits()} placeholder={`Weight (${getUnits()})`} />
      </div>
      <button className="arrows-icon-button" onClick={handleUnitChange}>
        <ArrowsUpDownIcon className="arrows-icon"/>
      </button>
    </div>
  )
}

const HeightSection = () => {
  const METRIC = "metric"
  const IMPERIAL = "imperial"
  const [units, setUnits] = useState(METRIC)

  const handleUnitChange = () => {
    if (units === METRIC) {
      setUnits(IMPERIAL)
    } else {
      setUnits(METRIC)
    }
  }
  
  return (
    <div className="input-with-arrow-button-container">
      {
        units === METRIC &&
        <div className="input-with-units-flex-container">
          <CLInputWithUnits units="cm" placeholder="Height (cm)" />
        </div>
      }
      {
        units === IMPERIAL &&
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
      <button className="arrows-icon-button" onClick={handleUnitChange}>
        <ArrowsUpDownIcon className="arrows-icon"/>
      </button>
    </div>
  )
}

const LabsSection = () => {
  return (
    <div className="labs-section-container">
      <img src={LabsFishbones} className="diagram-image"/>
      <input className="labs-text-input labs-w-input" type="text" placeholder="W" />
      <input className="labs-text-input labs-hb-input" type="text" placeholder="Hb" />
      <input className="labs-text-input labs-plt-input" type="text" placeholder="Plt" />
      <input className="labs-text-input labs-cr-input" type="text" placeholder="Cr" />
      <div className="radio-label-container first-na-radio-button">
        <Radio sx={{ padding: 0 }} />
        <p className="input-title">N/A</p>
      </div>
      <div className="radio-label-container second-na-radio-button">
        <Radio sx={{ padding: 0 }} />
        <p className="input-title">N/A</p>
      </div>
    </div>
  )
}

const PulsesSection = () => {
  return (
    <div className="pulses-section-container">
      <img src={Pulses} className="diagram-image"/>
      <input className="labs-checkbox-input bottom-left-checkbox-input" type="checkbox" />
      <input className="labs-checkbox-input top-left-checkbox-input" type="checkbox" />
      <input className="labs-checkbox-input top-right-checkbox-input" type="checkbox" />
      <input className="labs-checkbox-input bottom-right-checkbox-input" type="checkbox" />
    </div>
  )
}