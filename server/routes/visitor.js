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
    console.log("Inside the method call");
    connection.query('SELECT * FROM employee', function (error, results, fields) {
        console.log("Inside the connection");
        if (error) {
            console.log("Error while connecting database" + error);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.send(apiResponse);
        } else {
            console.log("Inside the connection2", results);
            apiResponse.statuscode = "200";
            apiResponse.message = "Successfully Fetched the UserDetails";
            apiResponse.result = results;
            res.send(apiResponse);
        }
    });
});

//GET API to Fetch a Specific User Data
router.get("/user/:id", (req, res) => {
    connection.query('SELECT * FROM employee WHERE UserName=' + req.params.id, function (error, results, fields) {
        console.log("Inside the connection");
        if (error) {
            console.log("Error while connecting database" + error);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "Successfully Fetched the UserDetails";
            apiResponse.result = results;
            res.send(apiResponse);
        }
    });
});

//POST API
router.post("/user", (req, res) => {
    let username = req.body.UserName;
    let mobilenumber = req.body.MobileNumber;
    let issuedBy = req.body.issuedBy;
    let issuedDateTime = req.body.issuedDateTime;
    let zone = req.body.zone;
    let tower = req.body.tower;
    let inTime = req.body.inTime;
    let outTime = req.body.outtime;
    let userData = req.body.userData;
    let UserID = '';
    var query1 = "INSERT INTO visitor ( ID, UserName, MobileNo, IssuedBy, IssuedDateTime, Zone, Tower, InTime, OutTime, UserData, Role, Password ) VALUES (  '1' ," + "'" + username + "'" + ",  " + "'" + mobilenumber + "'" + ", " + "'" + issuedBy + "'" + ", " + "'" + issuedDateTime + "'" + ",  " + "'" + zone + "'" + ",  " + "'" + tower + "'" + ",  " + "'" + inTime + "'" + ",  " + "'" + outTime + "'" + ",  " + "'" + userData + "'" + ",  " + "'" + role + "'" + ",  " + "'" + password + "'" + " )";
    connection.query(query1, function (error, results, fields) {
        console.log("Inside the connection");
        if (error) {
            console.log("Error while connecting database" + error);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "User Created Successfully";
            apiResponse.result = results;
            res.send(apiResponse);
        }
    });
});

//PUT API
router.put("/user/:id", (req, res) => {
    console.log("Request Received for the Update User");
    var query1 = "UPDATE visitor SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " , Password= " + req.body.password + "   WHERE Id= " + req.params.id;
    connection.query(query1, function (error, results, fields) {
        console.log("Inside the connection");
        if (error) {
            console.log("Error while connecting database" + error);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "User Updated Successfully";
            apiResponse.result = results;
            res.send(apiResponse);
        }
    });
});

router.post("/updateUserInfo", (req,res) => {
    var query = "select * from visitor";
    let response = executeQuery(res, query);
    apiResponse.statuscode = "200";
    apiResponse.message = "Successfully Fetched the UserList";
    apiResponse.result = response.recordset
    res.send(apiResponse);
});


module.exports = router;