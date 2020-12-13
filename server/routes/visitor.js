const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//Initialling connection string
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sram@225',
    database: 'usermanagement'
});

let apiResponse = { "message": "", "result": "", "statuscode": "" };


//GET API to Fetch all Users
router.get("/user", (req, res) => {
    connection.query('SELECT * FROM visitor,userpassinfo WHERE visitor.UserName = userpassinfo.UserName', function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            console.log("Inside the connection2", results);
            apiResponse.statuscode = "200";
            apiResponse.message = "Successfully Fetched the UserDetails";
            apiResponse.result = results;
            res.status(200).send(apiResponse);
        }
    });
});

//GET API to Fetch a Specific User Data
router.get("/user/:id", (req, res) => {
    var query1 = 'SELECT * FROM visitor,userpassinfo WHERE employee.UserName=' + "'" + req.body.userName + "'";
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "Successfully Fetched the UserDetails";
            apiResponse.result = results;
            res.status(200).send(apiResponse);
        }
    });
});

//POST API
router.post("/user", (req, res) => {
    let username = req.body.UserName;
    let mobilenumber = req.body.MobileNumber;
    let issuedBy = req.body.issuedBy;
    let issuedDateTime = req.body.issuedDateTime;
    let access_locations = req.body.access_locations;
    let inTime = req.body.inTime;
    let outTime = req.body.outtime;
    let userData = req.body.userData;
    let Current_Location = '';
    let userPass = req.body.userPass;
    let userImage = req.body.userImage;
    let userIdProof = req.body.userIdProof;
    let userIdProofNumber = req.body.userIdProofNumber;
    let userPassImage = req.body.userPassImage;
    let expiryDate = req.body.expiryDate;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let user_type = req.body.user_type;
    let id_code = req.body.id_code;
    let pass_status = req.body.pass_status;

    var query1 = "INSERT INTO visitor ( UserName, MobileNo, IssuedBy, IssuedDateTime, access_locations, InTime, OutTime, UserData, Current_Location, first_name, last_name ) VALUES (" + "'" + username + "'" + ",  " + "'" + mobilenumber + "'" + ", " + "'" + issuedBy + "'" + ", " + "'" + issuedDateTime + "'" + ",  " + "'" + access_locations + "'" + ", " + "'" + inTime + "'" + ",  " + "'" + outTime + "'" + ",  " + "'" + userData + "'" + ", " + "'" + Current_Location + "'" + ", " + "'" + first_name + "'" + " , " + "'" + last_name + "'" + " )";
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            var query2 = "INSERT INTO userpassinfo ( UserPass, UserName, UserImage, UserIDProof, UserIDProofNumber, PassImage, ExpairyDate, user_type, id_code, pass_status) VALUES (" + "'" + userPass + "'" + ",  " + "'" + username + "'" + ",  " + "'" + userImage + "'" + ",  " + "'" + userIdProof + "'" + ",  " + "'" + userIdProofNumber + "'" + ",  " + "'" + userPassImage + "'" + ",  " + "'" + expiryDate + "'" + ",  " + "'" + user_type + "'" + ",  " + "'" + id_code + "'" + ",  " + "'" + pass_status + "'" + " )";
            connection.query(query2, function (error, results, fields) {
                if (error) {
                    apiResponse.message = "Error while connecting database"
                    apiResponse.statuscode = "400";
                    apiResponse.result = error;
                    res.status(400).send(apiResponse);
                } else {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "User Created Successfully";
                    apiResponse.result = results;
                    res.status(200).send(apiResponse);
                }
            });
        }
    });

});

//PUT API
router.put("/user/:id", (req, res) => {
    let mobilenumber = req.body.MobileNumber;
    let access_locations = req.body.access_locations;
    let userData = req.body.userData;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;

    var query1 = "UPDATE visitor SET access_locations= " + "'" + access_locations + "'" + " , MobileNo=  " + "'" + mobilenumber + "'" + " , userData= " + "'" + userData + "'" + ", first_name= " + "'" + first_name + "'" + " , last_name= " + "'" + last_name + "'" + "   WHERE UserName= " + "'" + req.params.id + "'";
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "User Updated Successfully";
            apiResponse.result = results;
            res.status(200).send(apiResponse);
        }
    });
});

router.post("/updateUserInfo", (req, res) => {
    var query1 = "UPDATE visitor SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " WHERE UserName= " + req.params.id;
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "User Updated Successfully";
            apiResponse.result = results;
            res.status(200).send(apiResponse);
        }
    });
});


module.exports = router;