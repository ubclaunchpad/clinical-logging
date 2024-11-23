import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GeneralInfo } from './steps/GeneralInfo';
import { PatientInfo } from './steps/PatientInfo';
import { Investigations } from './steps/Investigations';
import { CasePlannings } from './steps/CasePlannings';
import { LearningPoints } from './steps/LearningPoints';

const steps = [
  'General Information',
  'Patient Information',
  'Investigations',
  'Case Planning',
  'Learning Points'
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <div style={{
                padding: '7px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#453FA6',
                borderRadius: '20px'
              }}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </div>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </Fragment>
      ) : (
        <div style={{height: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: '28px'}}>
          <Fragment>
            <div style={{textAlign: "left"}}>
              <Typography sx={{ mt: 2, mb: 1 }} style={{opacity: "0.6"}}>Step {activeStep + 1}</Typography>
              <h2 style={{fontSize: "32px"}}>{steps[activeStep]}</h2>
            </div>
            {activeStep === 0 && <GeneralInfo />}
            {activeStep === 1 && <PatientInfo />}
            {activeStep === 2 && <Investigations />}
            {activeStep === 3 && <CasePlannings />}
            {activeStep === 4 && <LearningPoints />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                backgroundColor="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} style={{color: 'white', backgroundColor: '#453FA6'}}>
                {activeStep === steps.length - 1 ? 'Save to Log History' : 'Next'}
              </Button>
            </Box>
          </Fragment>
        </div>
      )}
    </Box>
  );
}
