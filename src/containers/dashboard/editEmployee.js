import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import { FormControl , Select, MenuItem, InputLabel, TextField, Button} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

 const EditEmployee = ({ isOpen, handleClose }) => {
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
        <TextField
            label="User Name"
            placeholder="Enter User Name (Required Field)"
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
         <FormControl variant="outlined" fullWidth>
        <InputLabel id="role-select-outlined-label">Role</InputLabel>
        <Select
        style={{ textAlign: 'left'}}
         fullWidth
          label="Role"
          inputProps={{
            shrink: true,
          }}
          placeholder="Select Role"
          variant="outlined"
        >
        </Select>
        </FormControl>
      
        </DialogContentText>
      </DialogContent>
      <DialogActions>
            <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleClose}> Save </Button>
       </DialogActions>
    </Dialog>
  );
}

export default EditEmployee;