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

const EditEmployee = ({ isOpen, handleClose, handleSaveEmployee, isEditUser, empData }) => {

  const [values, setValues] = useState({
    UserName: "",
    MobileNumber: "",
    issuedBy: "",
    issuedDateTime: "",
    access_locations: {},
    inTime: "",
    outtime: "",
    userData: {},
    role: "",
    password: "",
    current_location: "",
    userPass: "",
    userImage: "",
    userIdProof: "",
    userIdProofNumber: "",
    userPassImage: "",
    expiryDate: "NO EXPIRY",
    first_name: "",
    last_name: "",
    user_type: "",
    id_code: "",
    pass_status: "Active",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    let addUserObject = {};
    if (!isEditUser) {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();
      let newdate = year + "-" + month + "-" + day;
      addUserObject = {
        "UserName": values.UserName,
        "MobileNumber": values.MobileNumber,
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
        "id_code": JSON.stringify({ "rf": uuidv4() }),
        "pass_status": "Active"
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

  //const options = JSON.parse(localStorage.getItem('config')).Roles;
  return (
    <Dialog open={isOpen}>
      <DialogTitle style={{ backgroundColor: 'rgb(54, 65, 83)', color: 'white', fontWeight: 500 }}>
        Employee Information Details
      <Fab color="primary" aria-label="add" style={{ position: "absolute", right: 20, top: 2, backgroundColor: "grey" }} onClick={handleClose}>
          <CloseIcon />
        </Fab>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: 'center' }}>
          {!isEditUser ? <TextField
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
          /> : ''}
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
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="role-select-outlined-label">Role</InputLabel>
            <Select
              style={{ textAlign: 'left' }}
              fullWidth
              label="Role"
              inputProps={{
                shrink: true,
              }}
              placeholder="Select Role"
              variant="outlined"
              name="role"
              onChange={handleChange}
              value={values.role}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </Select>
          </FormControl>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleSave}> Save </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditEmployee;