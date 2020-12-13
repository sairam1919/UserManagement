import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useState} from 'react';
import {CapturePhoto, WebcamCapture } from '../CapturePhoto/capturePhoto'
// import {CaptureImage } from '../CapturePhoto/captureImage'
// import TakePhoto  from '../CapturePhoto/takePhoto'


const StepTwo = ({handleGeneratePass}) => {
    const [ userPhotoUrl, setUserPhotoUrl] = useState('');
    const [ idProofPhotoUrl, setIdProofPhotoUrl] = useState('');
    const handleUserPhotoCapture = (dataUrl) => {
        setUserPhotoUrl(dataUrl);
        console.log(dataUrl)
    }
    
    const  handleSaveGeneratePass = () => {
        handleGeneratePass(userPhotoUrl);
    }
    // const handleIdProofPhotoCapture = (dataUrl) => {
    //     setIdProofPhotoUrl(dataUrl);
    // }
    return (
        <div style={{ width: 650, overflo: "hidden" }}>
            <DialogContent >
                <DialogContentText>
                  <WebcamCapture  dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture}/>
                   <FormControlLabel
          value="Building 1"
          control={<Checkbox color="primary" />}
          label="Building 1"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Building 2"
          control={<Checkbox color="primary" />}
          label="Building 2"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Building 3"
          control={<Checkbox color="primary" />}
          label="Building 3"
          labelPlacement="end"
        />
                        </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleSaveGeneratePass}> Generate Pass </Button>
            </DialogActions>
        </div>
    );
}

export default StepTwo;