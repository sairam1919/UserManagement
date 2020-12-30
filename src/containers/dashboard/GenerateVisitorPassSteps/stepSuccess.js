import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Paper, Grid, DialogContent } from '@material-ui/core';
import {  toJpeg  } from 'html-to-image';
// import QRCode from "react-qr-code";
var Barcode = require('react-barcode');
const StepSuccess = ({ data, handleSaveGeneratePass }) => {
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
   
    const handleSave = () => {
        toJpeg(document.getElementById('table-data-container'), { quality: 0.95 })
        .then(function (dataUrl) {
            const  _updateData= {
                ...data,
                userPassImage: dataUrl
            }
            handleSaveGeneratePass(_updateData);
        });
        
    }

    return (
        <div>
            <iframe id="ifmcontentstoprint" title="print" style={{height: '0px', width: '0px', position: 'absolute'}} />
            <DialogContent >
                <DialogContentText id="table-data-container" >
                    <Grid container spacing={1} component={Paper}>
                        <Grid item xs={6}>
                            <img src={data.userImage} style={{ height: 256, width: 256 }} alt="" />
                        </Grid>
                        <Grid item xs={6}>
                        <Barcode value={data.id_code} width={0.5} height={50} displayValue={false} style={{position: 'absolute'}}/>
                        {/* <QRCode value={data.id_code} style={{ height: 256, width: 256 }}/> */}
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
                        <strong> Pass Validity </strong>
                            <div> {data.issuedDateTime}</div>
                            <strong> To </strong>
                            <div> {data.expiryDate}</div>
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
                {/* <Button style={{ backgroundColor: 'green', color: 'white' }} variant="contained" onClick={handleClose}> Close </Button> */}
                <Button style={
                    { backgroundColor: 'green', color: 'white' }
                }
                    variant="contained"
                    onClick={handleSave}> Save </Button>
            </DialogActions>
        </div>
    );
}

export default StepSuccess;