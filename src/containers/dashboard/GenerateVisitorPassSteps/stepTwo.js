import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useState} from 'react';
import {CapturePhoto, WebcamCapture } from '../CapturePhoto/capturePhoto'

const StepTwo = ({handleGeneratePass, config, data}) => {
    const [ userPhotoUrl, setUserPhotoUrl] = useState('');
    // const [ idProofPhotoUrl, setIdProofPhotoUrl] = useState('');
    const handleUserPhotoCapture = (dataUrl) => {
        setUserPhotoUrl(dataUrl);
    }
    
    const  handleSaveGeneratePass = () => {
        handleGeneratePass(data);
    }

    const handleCheckBox = (e) => {
        
    }
    // const handleIdProofPhotoCapture = (dataUrl) => {
    //     setIdProofPhotoUrl(dataUrl);
    // }
    let zones = JSON.parse(config.Zones);
    return (
        <div style={{ width: 650, overflow: "hidden" }}>
            <DialogContent >
                <DialogContentText>
                   <CapturePhoto dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture}/>
                   <FormControlLabel
          value={zones[0].name}
          control={<Checkbox color="primary" />}
          label={zones[0].name}
          labelPlacement="end"
        />
        <FormControlLabel
          value={zones[1].name}
          control={<Checkbox color="primary" />}
          label={zones[1].name}
          labelPlacement="end"
        />
        <FormControlLabel
          value={zones[2].name}
          control={<Checkbox color="primary" />}
          label={zones[2].name}
          labelPlacement="end"
        />
                   {/* <WebcamCapture /> */}
                   {/* <CapturePhoto dataUrl={idProofPhotoUrl} handleCapture={handleIdProofPhotoCapture}/> */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleSaveGeneratePass}> Generate Pass </Button>
            </DialogActions>
        </div>
    );
}

export default StepTwo;