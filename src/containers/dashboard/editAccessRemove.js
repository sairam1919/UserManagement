import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import { FormControl, Checkbox, Button, FormControlLabel } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const EditAccessRemove = ({ isOpen, handleClose, visitData, handleAssignRemove, config }) => {
  const [accessLocations, setAccessLocations] = useState([]);
  const [zones, setZones] = useState([]);
  const [isChecked, setIsChecked] = useState();

  useEffect(() => {
    setAccessLocations(JSON.parse(visitData.access_locations));
    let zones = JSON.parse(config).Zones;
    for(let i = 0; i < JSON.parse(visitData.access_locations).length; i++) {
      for(let j = 0; j < zones.length; j++ ) {
        if(JSON.parse(visitData.access_locations)[i].name === zones[j].name) {
          zones[i].checked = true
        } else{
          zones[i].checked = false
        }
      }
    }
    setZones(zones)
  },[]);

  const handleCheckBox = (event) => {
    alert("handleCheckBox Triggerd");
    let data = accessLocations;
    if (document.getElementById([event.target.name]).checked) {
      alert("handleCheckBox Triggerd");
      data.push(JSON.parse(event.target.value));
    } else {
      alert("handleCheckBox Triggerd");
      for (var i = data.length - 1; i >= 0; --i) {
        if (data[i].name == [event.target.name]) {
          data.splice(i, 1);
        }
      }
    }
    setAccessLocations(data)
  }

  const handleAssignRmv = () => {
    visitData.access_locations = accessLocations;
    handleAssignRemove(visitData);
  }
  
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

          {zones.map(module => (
            <FormControl component="fieldset">
              <FormControlLabel
                value={JSON.stringify(module)}
                control={<Checkbox color="primary" id={module.name} checked = {module.checked} />}
                label={module.name}
                name={module.name}
                onChange={handleCheckBox}
                labelPlacement="end"
              />
            </FormControl>
          ))
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleAssignRmv}> Save </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAccessRemove;