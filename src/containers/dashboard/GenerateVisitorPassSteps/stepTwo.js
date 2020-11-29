import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { TextField, Button } from '@material-ui/core';
import React from 'react';

const StepTwo = ({handleGeneratePass}) => {
    return (
        <div>
            <DialogContent>
                <DialogContentText style={{ textAlign: 'center' }}>
                    Image
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleGeneratePass}> Generate Pass </Button>
            </DialogActions>
        </div>
    );
}

export default StepTwo;