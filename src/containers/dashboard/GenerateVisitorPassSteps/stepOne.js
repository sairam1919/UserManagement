import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { TextField, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';

const StepOne = ({ handleNext }) => {
    const [values, setValues] = useState({
        UserName: "",
        MobileNumber: "",
        issuedBy: "",
        issuedDateTime: "",
        access_locations: {},
        inTime: "",
        outtime: "",
        userData: {},
        current_location: "",
        userPass: "",
        userImage: "",
        userIdProof: "",
        userIdProofNumber: "",
        userPassImage: "",
        expiryDate: "",
        first_name: "",
        last_name: "",
        user_type: "",
        id_code: "",
        pass_status: "Active",
        id_type: '',
        address: '',
        representing: '',
        purposeOfVisit: ''
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let newdate = year + "-" + month + "-" + day;

        let generatePassObject = {
            "UserName": values.UserName,
            "MobileNumber": values.MobileNumber,
            "issuedBy": JSON.parse(localStorage.getItem('userDetails')).UserName,
            "issuedDateTime": newdate,
            "access_locations": JSON.stringify({}),
            "inTime": "",
            "outtime": "",
            "userData": JSON.stringify({ "email": values.email, "address": values.address, "representing": values.representing, "purposeOfVisit": values.purposeOfVisit }),
            "current_location": "",
            "userPass": uuidv4(),
            "userImage": "",
            "userIdProof": "",
            "userIdProofNumber": values.userIdProofNumber,
            "userPassImage": "",
            "expiryDate": values.expiryDate,
            "first_name": values.first_name,
            "last_name": values.last_name,
            "user_type": "visitor",
            "id_code": JSON.stringify({ "bc": uuidv4() }),
            "pass_status": "Active"
        }
        handleNext(generatePassObject);
    }
    return (
        <div>
            <DialogContent>
                <DialogContentText style={{ textAlign: 'center' }}>
                    <TextField
                        label="User Name"
                        placeholder="Enter User Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="UserName"
                        onChange={handleChange}
                    />
                    <TextField
                        label="First Name"
                        placeholder="Enter First Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="first_name"
                        onChange={handleChange}
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
                        name="last_name"
                        onChange={handleChange}
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
                        name="email"
                        onChange={handleChange}
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
                        name="MobileNumber"
                        onChange={handleChange}
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
                        name="id_type"
                        onChange={handleChange}
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
                        name="userIdProofNumber"
                        onChange={handleChange}
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
                        name="address"
                        onChange={handleChange}
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
                        name="representing"
                        onChange={handleChange}
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
                        name="purposeOfVisit"
                        onChange={handleChange}
                    />
                    <input type="date"
                        label="Expiry Date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={values.expiryDate}
                        name="expiryDate"
                        onChange={handleChange} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleSave}> Next </Button>
            </DialogActions>
        </div>
    );
}

export default StepOne;