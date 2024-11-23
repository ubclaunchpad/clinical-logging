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
  'General Info',
  'Patient Info',
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
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Save to Log History' : 'Next'}
            </Button>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
