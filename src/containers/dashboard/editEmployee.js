import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, InputLabel, TextField, Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { v4 as uuidv4 } from 'uuid';

const EditEmployee = ({ isOpen, handleClose, handleSaveEmployee, isEditUser, empData, config }) => {
    console.log('empData', empData)
    const [values, setValues] = useState({
        UserName: empData.UserName || "",
        MobileNo: empData.MobileNo || "",
        issuedBy: "",
        issuedDateTime: "",
        access_locations: {},
        inTime: "",
        outtime: "",
        userData: {},
        role: empData.Role || '',
        password: "",
        current_location: "",
        userPass: "",
        userImage: "",
        userIdProof: "",
        userIdProofNumber: "",
        userPassImage: "",
        expiryDate: "NO EXPIRY",
        first_name: empData.first_name || '',
        last_name: empData.last_name || '',
        user_type: "",
        id_code: empData.id_code || '',
        pass_status: "Active",
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        let addUserObject = {};
        let Zones = "";
        for (let i = 0; i < config.Zones.length; i++) {
            if (i === 0) {
                Zones += config.Zones[i].name;
            } else {
                Zones += "," + config.Zones[i].name;
            }
        }
        if (!isEditUser) {
            let dateObj = new Date();
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            let newdate = year + "-" + month + "-" + day;
            addUserObject = {
                "UserName": values.UserName,
                "MobileNumber": values.MobileNo,
                "issuedBy": JSON.parse(localStorage.getItem('userDetails')).UserName,
                "issuedDateTime": newdate,
                "access_locations": JSON.stringify({}),
                "inTime": "",
                "outtime": "",
                "userData": JSON.stringify({ "email": values.email }),
                "role": values.role,
                "password": "password",
                "current_location": "",
                "userPass": uuidv4(),
                "userImage": "",
                "userIdProof": "",
                "userIdProofNumber": "",
                "userPassImage": "",
                "expiryDate": "NO EXPIRY",
                "first_name": values.first_name,
                "last_name": values.last_name,
                "user_type": "employee",
                "id_code": values.id_code,
                "pass_status": "Active",
                "access_locations": JSON.stringify(config.Zones),
                "zones": Zones
            }
        } else {
            addUserObject = empData;
            addUserObject.MobileNumber = values.MobileNumber;
            addUserObject.role = values.role;
            addUserObject.first_name = values.first_name;
            addUserObject.last_name = values.last_name;
        }
        handleSaveEmployee({ "addUserObject": addUserObject, "isEditUser": isEditUser });
    }

    const options = JSON.parse(config).Roles;

    let checkDataToEnable = true; 
    if(values.userName && values.role && values.first_name && values.last_name && values.id_code && values.MobileNo) {
        checkDataToEnable= false;
    } 
    return (
        < Dialog open={isOpen} >
            < DialogTitle style={{ backgroundColor: 'rgb(54, 65, 83)', color: 'white', fontWeight: 500 }} >
                Employee Information Details
                < Fab color="primary aria - label = add" style={
                    { position: "absolute", right: 20, top: 2, backgroundColor: "grey" }
                }
                    onClick={handleClose} >
                    <CloseIcon />
                </Fab>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ textAlign: 'center' }} >
                    {!isEditUser ? < TextField
                        label="User Name"
                        placeholder="Enter User Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={
                            {
                                shrink: true,
                            }
                        }
                        variant="outlined"
                        name="UserName"
                        onChange={handleChange}
                        error={!values.UserName}
                        values={values.UserName}
                    /> : ''}
                    < TextField
                        label="Mobile Number"
                        placeholder="Enter Mobile Number (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={
                            {
                                shrink: true,
                            }
                        }
                        variant="outlined"
                        name="MobileNo"
                        onChange={handleChange}
                        error={!values.MobileNo}
                        value={values.MobileNo}
                    />
                    <TextField
                        label="First Name"
                        placeholder="Enter First Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={
                            {
                                shrink: true,
                            }
                        }
                        variant="outlined"
                        name="first_name"
                        onChange={handleChange}
                        error={!values.first_name}
                        value={values.first_name}

                    />
                    <TextField
                        label="Last Name"
                        placeholder="Enter Last Name (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={
                            {
                                shrink: true,
                            }
                        }
                        variant="outlined"
                        name="last_name"
                        onChange={handleChange}
                        error={!values.last_name}
                        value={values.last_name}

                    />
                    <TextField
                        label="RF ID Number"
                        placeholder="Enter RF ID (Required Field)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={
                            {
                                shrink: true,
                            }
                        }
                        variant="outlined"
                        name="id_code"
                        onChange={handleChange}
                        error={!values.id_code}
                        value={values.id_code}
                    />
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel id="role-select-outlined-label" > Role </InputLabel>
                        <Select style={{ textAlign: 'left' }}
                            fullWidth
                            label="Role"
                            inputProps={
                                {
                                    shrink: true,
                                }
                            }
                            placeholder="Select Role"
                            variant="outlined"
                            name="role"
                            onChange={handleChange}
                            value={values.role}
                            error={!values.role}
                            >
                            {
                                options.map(option => (
                                    <option value={option.value} > { option.label} </option>
                                ))}
                        </Select>
                    </FormControl>

                </DialogContentText>
            </DialogContent>
            <DialogActions >
                <Button style={
                    { backgroundColor: 'green', color: 'white' }
                }
                    variant="contained"
                    onClick={ checkDataToEnable ? null : handleSave}
                    disabled={checkDataToEnable}
                    > Save </Button>
            </DialogActions>
        </Dialog>
    );
}
export default EditEmployee;