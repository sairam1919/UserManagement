import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { TextField, Button } from '@material-ui/core';
import React from 'react';

const StepOne = ({handleNext}) => {
    return (
        <div>
            <DialogContent>
                <DialogContentText style={{ textAlign: 'center' }}>
                    <TextField
                        label="First Name"
                        placeholder="Enter First Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Last Name"
                        placeholder="Enter Last Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Email Address"
                        placeholder="Enter Email Address (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Email Address"
                        placeholder="Enter Email Address (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Mobile Number"
                        placeholder="Enter Mobile Number"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="ID Proof Type"
                        placeholder="Enter ID Proof Type"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="ID Proof Number"
                        placeholder="Enter ID Proof Number"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Address"
                        placeholder="Enter Address"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="State"
                        placeholder="Enter State"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="State"
                        placeholder="Enter State"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="City"
                        placeholder="Enter City"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="Pincode"
                        placeholder="Enter Pincode"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Representing"
                        placeholder="Enter Contact Person Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        label="Purpose of Visit"
                        placeholder="Enter Purpose of  Visit"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleNext}> Next </Button>
            </DialogActions>
        </div>
    );
}

export default StepOne;