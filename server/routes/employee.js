const express = require('express');
const router = express.Router();
const server = require("../server");
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
    connection.query('SELECT * FROM employee,userpassinfo WHERE employee.UserID = userpassinfo.UserID', function (error, results, fields) {
        console.log("Inside the connection");
        if (error) {
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
    var query1 = 'SELECT * FROM employee,userpassinfo WHERE employee.UserID =' + req.params.id
    connection.query(query1, function (error, results, fields) {
        if (error) {
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

router.post("/login", (req, res) => {
    let UserName = req.body.userName;
    let Password = req.body.password;
    console.log("Input Values", UserName, Password);
    connection.query('SELECT * FROM employee,userpassinfo WHERE employee.UserID=' + "'" + UserName + "'", function (error, results, fields) {
        if (error) {
            console.log("Error while connecting database" + error);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.send(apiResponse);
        } else {
            if (results.length && results[0].UserID === UserName && results[0].password === Password) {
                apiResponse.statuscode = "200";
                apiResponse.message = "User Authenticated Successfully";
                apiResponse.result = results;
                res.send(apiResponse);
            } else {
                apiResponse.statuscode = "400";
                apiResponse.message = "Unable to Authenticate the User";
                apiResponse.result = results;
                res.send(apiResponse);
            }
        }
    });
})

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
    let role = req.body.role;
    let password = req.body.password;
    let UserID = req.body.UserName + req.body.MobileNumber;
    let Current_Location = '';
    let userPass = req.body.userPass;
    let userImage = req.body.userImage;
    let userIdProof = req.body.userIdProof;
    let userIdProofNumber = req.body.userIdProofNumber;
    let userPassImage = req.body.userPassImage;
    let expiryDate = req.body.expiryDate;

    var query1 = "INSERT INTO employee ( ID, UserName, MobileNo, IssuedBy, IssuedDateTime, Zone, Tower, InTime, OutTime, UserData, Role, password, UserID, Current_Location ) VALUES (  '1' ," + "'" + username + "'" + ",  " + "'" + mobilenumber + "'" + ", " + "'" + issuedBy + "'" + ", " + "'" + issuedDateTime + "'" + ",  " + "'" + zone + "'" + ",  " + "'" + tower + "'" + ",  " + "'" + inTime + "'" + ",  " + "'" + outTime + "'" + ",  " + "'" + userData + "'" + ",  " + "'" + role + "'" + ",  " + "'" + password + "'" + ",  " + "'" + UserID + "'" + ",  " + "'" + Current_Location + "'" + " )";
    connection.query(query1, function (error, results, fields) {
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

    var query2 = "INSERT INTO userpassinfo ( UserPass, UserID, UserImage, UserIDProof, UserName, UserIDProofNumber, PassImage, ExpairyDate) VALUES (" + "'" + userPass + "'" + "'" + UserID + "'" + "'" + userImage + "'" + "'" + userIdProof + "'" + "'" + username + "'" + "'" + userIdProofNumber + "'" + "'" + userPassImage + "'" + "'" + expiryDate + "'" + " )";
    connection.query(query2, function (error, results, fields) {
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
    var query1 = "UPDATE employee SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " , Password= " + req.body.password + "   WHERE Id= " + req.params.id;
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

router.post("/updateUserInfo", (req, res) => {
    var query1 = "UPDATE employee SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " , Password= " + req.body.password + "   WHERE Id= " + req.params.id;
    connection.query(query1, function (error, results, fields) {
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
            let ws = server.Server();
            ws.connections.forEach((conn) => conn.send(apiResponse));
            res.send(apiResponse);
        }
    });
});


module.exports = router;