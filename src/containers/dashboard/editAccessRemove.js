import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import { FormControl, Checkbox, Button, FormControlLabel} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

 const EditAccessRemove = ({ isOpen, handleClose }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle style={{ backgroundColor: 'rgb(54, 65, 83)', color: 'white', fontWeight: 500 }}>
        Access Remove
      <Fab color="primary" aria-label="add" style={{ position: "absolute", right: 20, top: 2, backgroundColor: "grey" }} onClick={handleClose}>
        <CloseIcon />
      </Fab>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: 'center' }}>
        <FormControl component="fieldset">
        <FormControlLabel
          value="Building 1"
          control={<Checkbox color="primary" />}
          label="Building 1"
          labelPlacement="end"
        />
        </FormControl>

        <FormControl component="fieldset">
        <FormControlLabel
          value="Building 2"
          control={<Checkbox color="primary" />}
          label="Building 2"
          labelPlacement="end"
        />
        </FormControl>

        <FormControl component="fieldset">
        <FormControlLabel
          value="Building 3"
          control={<Checkbox color="primary" />}
          label="Building 3"
          labelPlacement="end"
        />
        </FormControl>
      
        </DialogContentText>
      </DialogContent>
      <DialogActions>
            <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleClose}> Save </Button>
       </DialogActions>
    </Dialog>
  );
}

export default EditAccessRemove;