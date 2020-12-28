import React, {useEffect, useState } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, Paper, Grid, DialogContent } from '@material-ui/core';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
// import { useQRCode } from 'react-qrcode';
// import { QRCode } from 'react-qrcode';
import QRCode from "react-qr-code";
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
      const [passImage, setPassImage] = useState();
    useEffect(() => {
        toJpeg(document.getElementById('table-data-container'), { quality: 0.95 })
  .then(function (dataUrl) {
    // var link = document.createElement('a');
    // link.download = 'my-image-name.jpeg';
    // link.href = dataUrl;
    // link.click();`
    console.log(dataUrl)
    setPassImage(dataUrl);
  });
    },[])

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
        <div style={{ width: 650, overflo: "hidden" }}>
                  <iframe id="ifmcontentstoprint" style={{height: '0px', width: '0px', position: 'absolute'}}></iframe>

            <DialogContent >
                <DialogContentText id="table-data-container" >
                    <Grid container spacing={1} component={Paper}>
                        <Grid item xs={6}>
                            <img src={data.userImage} style={{ height: 256, width: 256 }} />
                        </Grid>
                        <Grid item xs={6}>
                        <QRCode value={data.id_code} style={{ height: 256, width: 256 }}/>
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