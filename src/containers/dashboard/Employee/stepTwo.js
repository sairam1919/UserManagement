import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React, { useState } from 'react';
import { CapturePhoto } from '../CapturePhoto/capturePhoto'

export const StepTwo = ({ handleImage }) => {
    const [userPhotoUrl, setUserPhotoUrl] = useState('');
    const handleUserPhotoCapture = (dataUrl) => {
        setUserPhotoUrl(dataUrl);
        handleImage(dataUrl);
    }

    return (
            < DialogContent >
                < DialogContentText >
                    < CapturePhoto dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture} /> 
                </DialogContentText>
            </DialogContent >
    );
}