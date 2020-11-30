import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import { FormControl , Select, MenuItem, InputLabel, TextField, Button} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

 const ChangePassword = ({ isOpen, handlePasswordUpdate, handleClose }) => {
  const [values, setValues] = useState({
   newPassword: '',
   oldPassword: '',
   newPassword1: '',
  });

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  }

  const handlePasswordUpdateChange = () => {
    if(values.newPassword === values.newPassword1) {
      let bdy = { "oldPassword": values.oldPassword, "newPassword": values.newPassword };
      handlePasswordUpdate(bdy);
    } else {
      alert("New password Doesn't match..!");
    }  
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle style={{ backgroundColor: 'rgb(54, 65, 83)', color: 'white', fontWeight: 500 }}>
        Change Password
      <Fab color="primary" aria-label="add" style={{ position: "absolute", right: 20, top: 2, backgroundColor: "grey" }} onClick={handleClose}>
        <CloseIcon />
      </Fab>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: 'center' }}>
        <TextField
            label="Current Password"
            placeholder="Enter Current Password (Required Field)"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name = "oldPassword"
            onChange = {handleChange}
          />
          <TextField
            label="Enter Your New Password"
            placeholder="Enter Your New Password (Required Field)"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name = "newPassword"
            onChange = {handleChange}
          />
          <TextField
            label="Re-Enter Your New Password"
            placeholder="Re-Enter Your New Password (Required Field)"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name = "newPassword1"
            onChange = {handleChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
            <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handlePasswordUpdateChange}> Update Password </Button>
       </DialogActions>
    </Dialog>
  );
}

export default ChangePassword;