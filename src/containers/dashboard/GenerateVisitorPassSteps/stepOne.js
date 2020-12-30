import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Constants from '../../../Constants';

const StepOne = ({ handleNext }) => {
    const [values, setValues] = useState({
        UserName: "",
        MobileNumber: "",
        issuedBy: "",
        issuedDateTime: "",
        access_locations: {},
        inTime: "",
        outtime: "",
        userData: {},
        current_location: "",
        userPass: "",
        userImage: "",
        userIdProof: "",
        userIdProofNumber: "",
        userIdProofImage: "",
        userPassImage: "",
        expiryDate: "",
        first_name: "",
        last_name: "",
        user_type: "",
        id_code: "",
        pass_status: "Active",
        id_type: '',
        address: '',
        representing: '',
        purposeOfVisit: ''
    });

    const [ image, setImage] = useState();

    const handleChange = (event) => {
        console.log(event.target.value)
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let newdate = year + "-" + month + "-" + day;

        let generatePassObject = {
            "UserName": values.UserName,
            "MobileNumber": values.MobileNumber,
            "issuedBy": JSON.parse(localStorage.getItem('userDetails')).UserName,
            "issuedDateTime": newdate,
            "access_locations": JSON.stringify({}),
            "inTime": "",
            "outtime": "",
            "userData": JSON.stringify({ "email": values.email, "address": values.address, "representing": values.representing, "purposeOfVisit": values.purposeOfVisit }),
            "current_location": "",
            "userPass": uuidv4(),
            "userImage": Constants.USER_IMAGE,
            "userIdProof": values.userIdProof,
            "userIdProofNumber": values.userIdProofNumber,
            "userIdProofImage": image,
            "userPassImage": Constants.USER_IMAGE,
            "expiryDate": values.expiryDate,
            "first_name": values.first_name,
            "last_name": values.last_name,
            "user_type": "visitor",
            "id_code": uuidv4(),
            "pass_status": "Active",
            "zones": ""
        }
        handleNext(generatePassObject);
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        setValues({...values, userIdProofImage: event.target.value})
        const base64 = await convertBase64(file)
        setImage(base64);
      }

      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }
    return (<div>
        <DialogContent>
            <DialogContentText style={{ textAlign: 'center' }} >
                <TextField
                    label="User Name"
                    placeholder="Enter User Name (Required Field)"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="UserName"
                    value={values.UserName}
                    error={!values.UserName}
                    onChange={handleChange}
                />
                <TextField
                    label="First Name"
                    placeholder="Enter First Name (Required Field)"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="first_name"
                    value={values.first_name}
                    error={!values.first_name}
                    onChange={handleChange}
                />
                <TextField
                    label="Last Name"
                    placeholder="Enter Last Name (Required Field)"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="last_name"
                    value={values.last_name}
                    error={!values.last_name}
                    onChange={handleChange}
                />
                <TextField
                    label="Email Address"
                    placeholder="Enter Email Address (Required Field)"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="email"
                    value={values.email}
                    error={!values.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Mobile Number"
                    placeholder="Enter Mobile Number"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="MobileNumber"
                    value={values.MobileNumber}
                    error={!values.MobileNumber}
                    onChange={handleChange}
                />

                <TextField
                    label="ID Proof Type"
                    placeholder="Enter ID Proof Type"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="id_type"
                    value={values.id_type}
                    error={!values.id_type}
                    onChange={handleChange}
                /> 
                <TextField
                    label="ID Proof Number"
                    placeholder="Enter ID Proof Number"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="userIdProofNumber"
                    value={values.userIdProofNumber}
                    error={!values.userIdProofNumber}
                    onChange={handleChange}
                />

<TextField
                    label="ID Proof File Upload"
                    placeholder="Enter ID Proof File Upload"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                            min: new Date().toDateString()
                        }
                    }
                    variant="outlined"
                    type="file"
                    value={values.userIdProofImage}
                    error={!values.userIdProofImage}
                    onChange={handleFileRead}
                />
                {/* <img src={values.userIdProofImage} style={{ height: 100, width: 100}} /> */}
                <TextField label="Address"
                    placeholder="Enter Address"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="address"
                    value={values.address}
                    error={!values.address}
                    onChange={handleChange}
                />
                <TextField
                    label="Representing"
                    placeholder="Enter Contact Person Name"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="representing"
                    value={values.representing}
                    error={!values.representing}
                    onChange={handleChange}
                />
                <TextField
                    label="Purpose of Visit"
                    placeholder="Enter Purpose of  Visit"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="purposeOfVisit"
                    value={values.purposeOfVisit}
                    error={!values.purposeOfVisit}
                    onChange={handleChange}
                />

<TextField
type="date"
                    label="Expiry Date"
                    placeholder="Expiry Date"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="expiryDate"
                    value={values.expiryDate}
                    error={!values.expiryDate}
                    onChange={handleChange}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button style={
                { backgroundColor: 'green', color: 'white' }
            }
                variant="contained"
                onClick={handleSave} > Next </Button>
        </DialogActions>
    </div>
    );
}

export default StepOne;