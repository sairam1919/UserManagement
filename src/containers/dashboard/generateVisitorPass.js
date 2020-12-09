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
import StepSuccess  from './GenerateVisitorPassSteps/stepSuccess';
import Constants from '../../Constants';

const GenerateVisitorPass = ({isOpen, handleClose, config}) => {
    const [ step, setStep] = useState(1);
    const [data, setData] = useState();
    const [values, setValues] = useState({
      passObject: {},
    });

    const handleNext = (generatePassObject) => {
        setStep(2);
        setValues({...values, passObject: generatePassObject });
    }

    const handleGeneratePass = (dataUrl) => {
      setValues({...values, passObject: dataUrl });
      setStep(3)
      var url = Constants.GENERATE_PASS;
      fetch(url, {
        method: "POST",
        body: JSON.stringify(values.passObject),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
          alert(data.message);
        });
    }
    let renderComponent = null;
    switch(step) {
        case 1 : 
            renderComponent = <StepOne handleNext={(e) => handleNext(e)} />
            break;
        case 2:
            renderComponent = <StepTwo data={values.passObject} config = {config} handleGeneratePass={(e) => handleGeneratePass(e)} />
            break;
        case 3:
          renderComponent =<StepSuccess data={values.passObject}  handleClose={handleClose}/>
          break;
          default: 
          renderComponent = <StepOne handleNext={handleNext} />
            break;
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