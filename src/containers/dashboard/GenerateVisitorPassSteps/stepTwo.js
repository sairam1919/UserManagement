import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';
import React, { useState} from 'react';
import {CapturePhoto, WebcamCapture } from '../CapturePhoto/capturePhoto'

const StepTwo = ({handleGeneratePass}) => {
    const [ userPhotoUrl, setUserPhotoUrl] = useState('');
    // const [ idProofPhotoUrl, setIdProofPhotoUrl] = useState('');
    const handleUserPhotoCapture = (dataUrl) => {
        setUserPhotoUrl(dataUrl);
    }

    // const handleIdProofPhotoCapture = (dataUrl) => {
    //     setIdProofPhotoUrl(dataUrl);
    // }
    return (
        <div style={{ width: 650, overflo: "hidden" }}>
            <DialogContent >
                <DialogContentText>
                   <CapturePhoto dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture}/>
                   {/* <WebcamCapture /> */}
                   {/* <CapturePhoto dataUrl={idProofPhotoUrl} handleCapture={handleIdProofPhotoCapture}/> */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleGeneratePass}> Generate Pass </Button>
            </DialogActions>
        </div>
    );
}

export default StepTwo;