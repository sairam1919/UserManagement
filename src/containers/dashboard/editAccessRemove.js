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
  
  useEffect(() => {
    let zones = JSON.parse(config).Zones;
    let access_locations = JSON.parse(visitData.access_locations);
    for(let i = 0; i < access_locations.length; i++) {
      for(let j = 0; j < zones.length; j++ ) {
        if(access_locations[i].name === zones[j].name) {
          zones[j].checked = true
        } 
      }
    }
    setZones(zones);
    setAccessLocations(JSON.parse(visitData.access_locations));

  },[]);

  const handleCheckBox = (event) => {
    let data = accessLocations;
    if (event.target.checked) {  
      data.push(JSON.parse(event.target.value));
    } else {
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === event.target.name) {
          console.log(data[i].name, event.target.name)
          data = data.filter( item => item.name !== event.target.name );
        }
      }
    }
    let zones = JSON.parse(config).Zones;
    let _zones =[];
    zones.forEach((zone)=> {
      console.log(data ,zone, data.filter((item) => { if(item.name.toString() === zone.name.toString()) {return true } else {return false}}))
      if(data.length &&  data.filter((item) => { if(item.name.toString() === zone.name.toString()) {return true } else {return false}}).length) {
        console.log(true)
        const _zone = {
          ...zone,
          checked: true
        };
        _zones.push(_zone);
      } else {
        console.log(false)
        const _zone = {
          ...zone,
          checked: false
        };
        _zones.push(_zone);
      }
    })
    setZones(_zones)
    setAccessLocations(data)
  }

  const handleAssignRmv = () => {
    visitData.access_locations = JSON.stringify(accessLocations);
    let Zones = "";
    for (let i = 0; i < accessLocations.length; i++) {
      if (i === 0) {
          Zones += accessLocations[i].name;
      } else {
          Zones += "," + accessLocations[i].name;
      }
  }
  visitData.zones = Zones;
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

          {zones.map((module, index) => (
            <FormControl component="fieldset" key={`${module.name}` + 'control'}>
              <FormControlLabel
                key={`${module.name} + ${index}`}
                value={JSON.stringify(module)}
                control={<Checkbox color="primary" id={module.name} checked={module.checked} />}
                label={module.name}
                name={module.name}
                onChange={handleCheckBox}
                labelPlacement="end"
              />
              {/* <input
              type="checkbox"
              key={module.name}
              value={JSON.stringify(module)}
              name={module.name}
              checked={module.checked} />
              {module.name} */}
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