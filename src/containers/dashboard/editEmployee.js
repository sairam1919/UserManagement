import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { v4 as uuidv4 } from 'uuid';
import { StepOne } from "./Employee/stepOne";
import { StepTwo } from "./Employee/stepTwo";
import {  MenuItem, Button } from '@material-ui/core';

const EditEmployee = ({ isOpen, handleClose, handleSaveEmployee, isEditUser, empData, config }) => {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        UserName: empData && empData.UserName || "",
        MobileNo: empData && empData.MobileNo || "",
        issuedBy: "",
        issuedDateTime: "",
        access_locations: {},
        inTime: "",
        outtime: "",
        userData: {},
        role: empData ? empData.Role : '',
        password: "",
        current_location: "",
        userPass: "",
        userImage: "",
        userIdProof: "",
        userIdProofNumber: "",
        userPassImage: "",
        expiryDate: "NO EXPIRY",
        first_name: empData ? empData.first_name : '',
        last_name: empData ? empData.last_name : '',
        user_type: "",
        id_code: empData ? empData.id_code : '',
        pass_status: "Active",
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        let addUserObject = {};
        let Zones = "";
        let configZones = JSON.parse(config).Zones;
        for (let i = 0; i < configZones.length; i++) {
            if (i === 0) {
                Zones += configZones[i].name;
            } else {
                Zones += "," + configZones[i].name;
            }
        }
        if (!isEditUser) {
            let dateObj = new Date();
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            let newdate = year + "-" + month + "-" + day;
            addUserObject = {
                "UserName": values.UserName,
                "MobileNo": values.MobileNo,
                "issuedBy": JSON.parse(localStorage.getItem('userDetails')).UserName,
                "issuedDateTime": newdate,
                "userData": JSON.stringify({}),
                "Role": values.role,
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
                "id_code": values.id_code,
                "pass_status": "Active",
                "access_locations": JSON.stringify(JSON.parse(config).Zones),
                "zones": Zones
            }
        } else {
            addUserObject = empData;
            addUserObject.MobileNo = values.MobileNo;
            addUserObject.Role = values.role;
            addUserObject.first_name = values.first_name;
            addUserObject.last_name = values.last_name;
        }
        handleSaveEmployee({ "addUserObject": addUserObject, "isEditUser": isEditUser });
    }

    const options = JSON.parse(config).Roles;

    const [checkDataToEnable, setCheckDataToEnable] = useState(true); 
    useEffect(() => {
        if(values.UserName && values.role && values.first_name && values.last_name && values.id_code && values.MobileNo) {
            setCheckDataToEnable(false);
        } else {
            setCheckDataToEnable(true);
        }
    },[values,checkDataToEnable])
     
const handleImage= (dataUrl) => {
    setValues({ ...values, userPassImage: dataUrl, userImage: dataUrl, userIdProofImage: dataUrl })
}
   const handleNext = () => {
        setStep(2);
    };

    return (
        < Dialog open={isOpen} >
            < DialogTitle style={{ backgroundColor: 'rgb(54, 65, 83)', color: 'white', fontWeight: 500 }} >
                Employee Information Details
                < Fab color="primary aria - label = add" style={
                    { position: "absolute", right: 20, top: 2, backgroundColor: "grey" }
                }
                    onClick={handleClose} >
                    <CloseIcon />
                </Fab>
            </DialogTitle>
            { step === 1 ? 
            <StepOne isEditUser={isEditUser} options={options} values={values} handleChange={handleChange}/> : 
            <StepTwo handleImage={handleImage}/>}
            <DialogActions>
                { step === 1 ? <Button style={
                    { backgroundColor: 'green', color: 'white' }
                }
                    variant="contained"
                    onClick={checkDataToEnable ? null : handleNext}
                    disabled={checkDataToEnable}
                > Next </Button>
            :
            <Button style={
                { backgroundColor: 'green', color: 'white' }
            }
                variant="contained"
                onClick={checkDataToEnable ? null : handleSave}
                disabled={checkDataToEnable}
            > Save </Button> }
                
            </DialogActions>
        </Dialog>
    );
}
export default EditEmployee;