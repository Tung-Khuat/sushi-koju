import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Store } from '../../store';
import SushiMenuList from '../sushi-menu-list/sushi-menu-list';
import SushiBoxList from '../sushi-menu-list/sushi-box-list';
import SushiPresetList from '../sushi-menu-list/sushi-preset-list';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '100px auto',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select boxes', 'Select Sushi', 'Additional Info'];
}

export default function SushiMenuIndex() {
  const classes = useStyles();
  const steps = getSteps();

  const [activeStep, setActiveStep] = React.useState(0);
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.sushiMenu.length === 0 && fetchSushiMenu(dispatch);
    state.sushiBox.length === 0 && fetchSushiBox(dispatch);
    state.sushiPresetList.length === 0 && fetchSushiPresetList(dispatch);
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <SushiPresetList sushiPresetList={state.sushiPresetList} />;
      case 1:
        return <SushiMenuList sushiMenu={state.sushiMenu} />;
      case 2:
        return <SushiBoxList sushiBoxData={state.sushiBox} />;
      default:
        return 'Uknown stepIndex';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <section className="sushi-menu-container">All steps completed</section>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
