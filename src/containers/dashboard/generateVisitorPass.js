import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import { FormControl , Select, MenuItem, InputLabel, TextField, Button} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import StepOne from './GenerateVisitorPassSteps/stepOne';
import StepTwo from './GenerateVisitorPassSteps/stepTwo';

const GenerateVisitorPass = ({isOpen, handleClose}) => {
    const [ step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
    }

    const handleGeneratePass = () => {
        handleClose();
    }
    let renderComponent = null;
    switch(step) {
        case 1 : 
            renderComponent = <StepOne handleNext={handleNext} />
            break;
        case 2:
            renderComponent = <StepTwo handleGeneratePass={handleGeneratePass} />
    }

    
    return (
        <Dialog open={isOpen}>
        <DialogTitle style={{ backgroundColor: 'rgb(54, 65, 83)', color: 'white', fontWeight: 500 }}>
          Generate Visitor Pass
        <Fab color="primary" aria-label="add" style={{ position: "absolute", right: 20, top: 2, backgroundColor: "grey" }} onClick={handleClose}>
          <CloseIcon />
        </Fab>
        </DialogTitle>
        {renderComponent}
      </Dialog>
    );
}
export default GenerateVisitorPass; 