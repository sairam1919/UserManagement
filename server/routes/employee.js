const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const fs = require("fs");

//Initialling connection string
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "usermanagement",
});

let apiResponse = { message: "", result: "", statuscode: "" };

//GET API to Fetch all Users
router.get("/user", (req, res) => {
    connection.query(
        "SELECT * FROM employee,userpassinfo WHERE employee.UserName = userpassinfo.UserName",
        function(error, results, fields) {
            if (error) {
                apiResponse.message = "Error while connecting database";
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
        }
    );
});

//GET API to Fetch a Specific User Data
router.get("/user/:id", (req, res) => {
    var query1 =
        "SELECT * FROM employee,userpassinfo WHERE UserName=" +
        "'" +
        req.body.userName +
        "'" +
        " AND userpassinfo.UserName =" +
        "'" +
        UserName +
        "'";
    connection.query(query1, function(error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
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

router.post("/login", (req, res) => {
    let UserName = req.body.userName;
    let Password = req.body.password;
    let query1 =
        "SELECT * FROM employee,userpassinfo WHERE employee.UserName=" +
        "'" +
        UserName +
        "'" +
        " AND userpassinfo.UserName =" +
        "'" +
        UserName +
        "'";
    console.log("Query1", query1);
    connection.query(query1, function(error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            if (
                results.length &&
                results[0].UserName.toLowerCase() === UserName.toLowerCase() &&
                results[0].password === Password
            ) {
                apiResponse.statuscode = "200";
                apiResponse.message = "User Authenticated Successfully";
                apiResponse.result = results[0];
                res.status(200).send(apiResponse);
            } else {
                apiResponse.statuscode = "400";
                apiResponse.message = "Unable to Authenticate the User";
                apiResponse.result = "";
                res.status(500).send(apiResponse);
            }
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
    let role = req.body.role;
    let password = req.body.password;
    let Current_Location = "";
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
    let zones = req.body.zones;

    connection.query(
        "SELECT * FROM userpassinfo WHERE userpassinfo.id_code =" + id_code,
        function(error, results, fields) {
            if (error) {
                apiResponse.message = "Error while connecting database";
                apiResponse.statuscode = "400";
                apiResponse.result = error;
                res.status(400).send(apiResponse);
            } else {
                if (results.length) {
                    apiResponse.message = "The RF ID Already assigned to other user";
                    apiResponse.statuscode = "2003";
                    apiResponse.result = [];
                    res.status(500).send(apiResponse);
                } else {
                    var query1 =
                        "INSERT INTO employee ( UserName, MobileNo, IssuedBy, IssuedDateTime, access_locations, InTime, OutTime, UserData, Role, password, Current_Location, first_name, last_name ) VALUES (" +
                        "'" +
                        username +
                        "'" +
                        ",  " +
                        "'" +
                        mobilenumber +
                        "'" +
                        ", " +
                        "'" +
                        issuedBy +
                        "'" +
                        ", " +
                        "'" +
                        issuedDateTime +
                        "'" +
                        ",  " +
                        "'" +
                        access_locations +
                        "'" +
                        ", " +
                        "'" +
                        inTime +
                        "'" +
                        ",  " +
                        "'" +
                        outTime +
                        "'" +
                        ",  " +
                        "'" +
                        userData +
                        "'" +
                        ",  " +
                        "'" +
                        role +
                        "'" +
                        ",  " +
                        "'" +
                        password +
                        "'" +
                        ", " +
                        "'" +
                        Current_Location +
                        "'" +
                        ", " +
                        "'" +
                        first_name +
                        "'" +
                        " , " +
                        "'" +
                        last_name +
                        "'" +
                        " )";
                    connection.query(query1, function(error, results, fields) {
                        if (error) {
                            apiResponse.message = "Error while connecting database";
                            apiResponse.statuscode = "400";
                            apiResponse.result = error;
                            res.status(400).send(apiResponse);
                        } else {
                            var query2 =
                                "INSERT INTO userpassinfo ( UserPass, UserName, UserImage, UserIDProof, UserIDProofNumber, PassImage, ExpairyDate, user_type, id_code, pass_status, zones) VALUES (" +
                                "'" +
                                userPass +
                                "'" +
                                ",  " +
                                "'" +
                                username +
                                "'" +
                                ",  " +
                                "'" +
                                userImage +
                                "'" +
                                ",  " +
                                "'" +
                                userIdProof +
                                "'" +
                                ",  " +
                                "'" +
                                userIdProofNumber +
                                "'" +
                                ",  " +
                                "'" +
                                userPassImage +
                                "'" +
                                ",  " +
                                "'" +
                                expiryDate +
                                "'" +
                                ",  " +
                                "'" +
                                user_type +
                                "'" +
                                ",  " +
                                "'" +
                                id_code +
                                "'" +
                                ",  " +
                                "'" +
                                pass_status +
                                "'" +
                                ",  " +
                                "'" +
                                zones +
                                "'" +
                                " )";
                            connection.query(query2, function(error, results, fields) {
                                if (error) {
                                    apiResponse.message = "Error while connecting database";
                                    apiResponse.statuscode = "400";
                                    apiResponse.result = error;
                                    res.status(400).send(apiResponse);
                                } else {
                                    apiResponse.statuscode = "200";
                                    apiResponse.message = "User Created Successfully";
                                    apiResponse.result = [];
                                    res.status(200).send(apiResponse);
                                }
                            });
                        }
                    });
                }
            }
        }
    );
});

//PUT API
router.put("/user/:id", (req, res) => {
    let mobilenumber = req.body.MobileNumber;
    let access_locations = req.body.access_locations;
    let userData = req.body.userData;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let role = req.body.role;

    var query1 =
        "UPDATE employee SET access_locations= " +
        "'" +
        access_locations +
        "'" +
        " , MobileNo=  " +
        "'" +
        mobilenumber +
        "'" +
        " , userData= " +
        "'" +
        userData +
        "'" +
        ", first_name= " +
        "'" +
        first_name +
        "'" +
        " , last_name= " +
        "'" +
        last_name +
        "'" +
        " , Role= " +
        "'" +
        role +
        "'" +
        "  WHERE UserName= " +
        "'" +
        req.params.id +
        "'";
    connection.query(query1, function(error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
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
    var query1 =
        "UPDATE employee SET OutTime= " +
        req.body.outTime +
        " , InTime=  " +
        req.body.inTime +
        " WHERE UserName= " +
        req.params.id;
    connection.query(query1, function(error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
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

//PUT API
router.put("/user/changePassword/:id", (req, res) => {
    var query1 =
        "SELECT * FROM employee WHERE employee.UserName=" +
        "'" +
        req.params.id +
        "'";
    connection.query(query1, function(error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            if (!(results[0].password === req.body.oldPassword)) {
                apiResponse.statuscode = "404";
                apiResponse.message = "Password Does Not Match..!";
                apiResponse.result = "";
                res.status(200).send(apiResponse);
            }
        }
    });
    var query2 =
        "UPDATE employee SET password= " +
        "'" +
        req.body.newPassword +
        "'" +
        " WHERE employee.UserName=" +
        "'" +
        req.params.id +
        "'";
    connection.query(query2, function(error, results, fields) {
        if (error) {
            console.log("Error while connecting database" + error);
            apiResponse.message = "Error while connecting database";
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "Password Updated Successfully";
            apiResponse.result = results;
            res.status(200).send(apiResponse);
        }
    });
});

router.get("/fetchConfig", (req, res) => {
    fs.readFile(
        "config.json", { encoding: "utf8", flag: "r" },
        function(err, data) {
            if (err) {
                apiResponse.message = "Error While fetching the config";
                apiResponse.statuscode = "400";
                apiResponse.result = err;
                res.status(400).send(JSON.parse(apiResponse));
            } else {
                apiResponse.message = "Config Fetched Successfully";
                apiResponse.statuscode = "200";
                apiResponse.result = data;
                res.status(200).send(JSON.stringify(apiResponse));
            }
        }
    );
});

//GET API to Fetch all Users
router.post("/usersPerLocation", (req, res) => {
    connection.query(
        "SELECT * FROM userpassinfo WHERE userpassinfo.zones LIKE " +
        "'" +
        "%" +
        req.body.location +
        "%" +
        "' && userpassinfo.pass_status = 'Active'",
        function(error, results, fields) {
            if (error) {
                apiResponse.message = "Error while connecting database";
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
        }
    );
});

module.exports = router;