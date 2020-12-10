import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { CapturePhoto, WebcamCapture } from '../CapturePhoto/capturePhoto'

const StepTwo = ({ handleGeneratePass, config, data }) => {
    const [userPhotoUrl, setUserPhotoUrl] = useState('');
    const [accessLocations, setAccessLocations] = useState([]);
    // const [ idProofPhotoUrl, setIdProofPhotoUrl] = useState('');
    const handleUserPhotoCapture = (dataUrl) => {
        setUserPhotoUrl(dataUrl);
    }

    const handleSaveGeneratePass = () => {
        data.access_locations = JSON.stringify(accessLocations);
        handleGeneratePass(data);
    }

    const handleCheckBox = (event) => {
        let data = accessLocations;
        if (document.getElementById([event.target.name]).checked) {
            data.push(JSON.parse(event.target.value));
        } else {
            for(var i = data.length - 1; i >= 0; --i) {
                console.log("Inside the for loop", data[i], [event.target.name]);
                if (data[i].name == [event.target.name]) {
                    data.splice(i, 1);
                }
            }
        }
        setAccessLocations(data)
    }
    // const handleIdProofPhotoCapture = (dataUrl) => {
    //     setIdProofPhotoUrl(dataUrl);
    // }
    let zones = JSON.parse(config).Zones;
    return (
        <div style={{ width: 650, overflow: "hidden" }}>
            <DialogContent >
                <DialogContentText>
                    <CapturePhoto dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture} />
                    <FormControlLabel
                        value={JSON.stringify(zones[0])}
                        control={<Checkbox color="primary" id={zones[0].name} />}
                        label={zones[0].name}
                        labelPlacement="end"
                        name = {zones[0].name}
                        onChange={handleCheckBox}
                    />
                    <FormControlLabel
                        value={JSON.stringify(zones[1])}
                        control={<Checkbox color="primary" id={zones[1].name}/>}
                        label={zones[1].name}
                        labelPlacement="end"
                        name = {zones[1].name}
                        onChange={handleCheckBox}
                    />
                    <FormControlLabel
                        value={JSON.stringify(zones[2])}
                        control={<Checkbox color="primary" id={zones[2].name}/>}
                        label={zones[2].name}
                        labelPlacement="end"
                        name = {zones[2].name}
                        onChange={handleCheckBox}
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