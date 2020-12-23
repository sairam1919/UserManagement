import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Paper, Grid, DialogContent } from '@material-ui/core';


const StepSuccess = ({ data, handleClose }) => {
    const printTable = () => {
        var content = document.getElementById("table-data-container");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        console.log("content",content.innerHTML)
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
      };
    return (
        <div style={{ width: 650, overflo: "hidden" }}>
                  <iframe id="ifmcontentstoprint" style={{height: '0px', width: '0px', position: 'absolute'}}></iframe>

            <DialogContent >
                <DialogContentText>
                    <Grid container spacing={3} id="table-data-container" component={Paper}>
                        <Grid item xs={6}>
                            <img src={data.userImage} style={{ height: 300, width: 300 }} />
                        </Grid>
                        <Grid item xs={6}>
                            <strong> Pass Validity </strong>
                            <div> {data.issuedDateTime}</div>
                            <strong> To </strong>
                            <div> {data.expiryDate}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <strong>Full Name</strong> : {data.UserName}
                            <br />
                            <strong>Id Number</strong> :  {data.userPass}
                            <br />

                            <strong>Phone Number</strong>: {data.MobileNumber}
                            <br />

                            <strong>Email Address</strong>: {JSON.parse(data.userData).email}
                            <br />

                            <strong>Purpose of Visit</strong>: {JSON.parse(data.userData).purposeOfVisit}

                            <br />

                            <strong>Representing</strong>: {JSON.parse(data.userData).representing}
                            <br />

                        </Grid>
                        <Grid item xs={6}>
                            <strong>Building Access</strong>
                            <ul>
                                {JSON.parse(data.access_locations).map(module => (
                                    <li>
                                        {module.name}
                                    </li>
                                ))
                                }
                            </ul>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={printTable}> Print </Button>
                <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleClose}> Close </Button>
            </DialogActions>
        </div>
    );
}

export default StepSuccess;