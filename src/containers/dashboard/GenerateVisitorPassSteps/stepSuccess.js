import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, FormControlLabel, Checkbox, Grid, DialogContent } from '@material-ui/core';


const StepSuccess = ({data, handleClose}) => {

    console.log('image', data);
    return (
        <div style={{ width: 650, overflo: "hidden" }}>
        <DialogContent >
            <DialogContentText>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                <img src={data} style={{ height: 300, width: 300}} />
                </Grid>
                <Grid item xs={6}>
                    <strong> Pass Validity </strong>
                    <div> 12/13/2020 09:00 AM</div>
                    <strong> To </strong>
                    <div> 12/13/2020 09:00 AM</div>
                </Grid>
                <Grid item xs={6}>
                    <strong>Full Name</strong> : Gudivada Dilip
                    <br/>
                    <strong>Id Number</strong> :  5648508
                    <br/>

                    <strong>Phone Number</strong>: 9987694650
                    <br/>

                    <strong>Email Address</strong>: dgdh@gmail.com
                    <br/>

                    <strong>Purpose of Visit</strong>: IT Support send by vendor
                    <br/>

                    <strong>Representing</strong>: Watson
                    <br/>

                </Grid>
                <Grid item xs={6}>
                    <strong>Building Access</strong> 
                    <ul>
                        <li> Building 1</li>
                        <li> Building 4</li>
                        <li> Building 6</li>
                    </ul>
                </Grid>
            </Grid>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleClose}> Close </Button>
        </DialogActions>
    </div>
    );
}

export default StepSuccess;