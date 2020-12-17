import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useState, Fragment } from 'react';
import { CapturePhoto, WebcamCapture } from '../CapturePhoto/capturePhoto'

const StepTwo = ({ handleGeneratePass, config, data }) => {
    const [userPhotoUrl, setUserPhotoUrl] = useState('');
    const [accessLocations, setAccessLocations] = useState([]);
    const [idProofPhotoUrl, setIdProofPhotoUrl] = useState('');

    const handleUserPhotoCapture = (dataUrl) => {
        setUserPhotoUrl(dataUrl);
        console.log(dataUrl)
    }

    const handleSaveGeneratePass = () => {
        data.access_locations = JSON.stringify(accessLocations);
        let Zones = "";
        for (let i = 0; i < accessLocations.length; i++) {
            if (i === 0) {
                Zones += accessLocations[i].name;
            } else {
                Zones += "," + accessLocations[i].name;
            }
        }
        data.zones = Zones;
        handleGeneratePass(data);
    }

    const handleCheckBox = (event) => {
        let data = accessLocations;
        if (document.getElementById([event.target.name]).checked) {
            data.push(JSON.parse(event.target.value));
        } else {
            for (var i = data.length - 1; i >= 0; --i) {
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
        < div style={
            { width: 650, overflow: "hidden" }
        } >
            < DialogContent >
                < DialogContentText >
                    < WebcamCapture dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture} />
                    < CapturePhoto dataUrl={userPhotoUrl} handleCapture={handleUserPhotoCapture} /> {
                        zones.map(zone => (<
                            FormControlLabel value={JSON.stringify(zone)}
                            control={< Checkbox color="primary"
                                id={zone.name}
                            />}
                            label={zone.name}
                            labelPlacement="end"
                            name={zone.name}
                            onChange={handleCheckBox}
                        />
                        ))
                    }

                    { /* <WebcamCapture /> */} { /* <CapturePhoto dataUrl={idProofPhotoUrl} handleCapture={handleIdProofPhotoCapture}/> */}
                </DialogContentText>
            </DialogContent >
            <DialogActions >
                <Button style={
                    { backgroundColor: 'green', color: 'white' }
                }
                    variant="contained"
                    onClick={handleSaveGeneratePass}> Generate Pass </Button>
            </DialogActions>
        </div>
    );
}

export default StepTwo;