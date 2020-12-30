const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const logger = require("morgan");

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
        "SELECT * FROM visitor,userpassinfo WHERE visitor.UserName = userpassinfo.UserName",
        function (error, results, fields) {
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
        "SELECT * FROM visitor,userpassinfo WHERE visitor.UserName=" +
        "'" +
        req.params.id +
        "'" +
        " AND userpassinfo.UserName =" +
        "'" +
        req.params.id +
        "'";
    connection.query(query1, function (error, results, fields) {
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

//POST API
router.post("/user", (req, res) => {
    let username = req.body.UserName;
    let mobilenumber = req.body.MobileNumber;
    let issuedBy = req.body.issuedBy;
    let issuedDateTime = req.body.issuedDateTime;
    let access_locations = req.body.access_locations;
    let userData = req.body.userData;
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

    var query1 =
        "INSERT INTO visitor ( UserName, MobileNo, IssuedBy, IssuedDateTime, access_locations, UserData, first_name, last_name ) VALUES (" +
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
        userData +
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
    connection.query(query1, function (error, results, fields) {
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
            connection.query(query2, function (error, results, fields) {
                if (error) {
                    apiResponse.message = "Error while connecting database";
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
    let zones = req.body.zones;

    var query1 =
        "UPDATE visitor SET access_locations= " +
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
        "   WHERE UserName= " +
        "'" +
        req.params.id +
        "'";
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            query1 = "UPDATE userpassinfo SET zones=  " +
                "'" + zones + "'" +
                " WHERE userpassinfo.UserName = " +
                "'" + req.body.id + "'";
            connection.query(query1, function (error, results, fields) {
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
        }
    });
});

router.post("/updateUserInfo", (req, res) => {
    var query1 =
        "SELECT * FROM userpassinfo WHERE userpassinfo.id_code =" +
        "'" +
        req.body.pass +
        "'" + " AND userpassinfo.pass_status = 'Active'";
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            let resp = JSON.parse(JSON.stringify(results));
            if (req.body.type === "in") {
                query1 = "UPDATE userpassinfo SET InTime=  " +
                    "'" + req.body.time + "'" + "," + "Current_Location = " + "'" + req.body.location + "'" +
                    " WHERE userpassinfo.id_code = " +
                    "'" + req.body.pass + "'";
            } else if (req.body.type === "out") {
                query1 = "UPDATE userpassinfo SET OutTime=  " +
                    "'" + req.body.time + "'" + "," + "Current_Location = " + "" +
                    " WHERE userpassinfo.id_code = " +
                    "'" + req.body.pass + "'";
            }
            connection.query(query1, function (error, results, fields) {
                if (error) {
                    apiResponse.message = "Error while connecting database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = error;
                    res.status(400).send(apiResponse);
                } else {
                    let UserName = resp[0].UserName;
                    let query2 = "INSERT INTO history ( UserName,id_code,activity,location,timestamp) VALUES (" +
                        "'" +
                        UserName +
                        "'" +
                        ",  " +
                        "'" +
                        req.body.pass +
                        "'" +
                        ",  " +
                        "'" +
                        req.body.type +
                        "'" +
                        ",  " +
                        "'" +
                        req.body.location +
                        "'" +
                        ",  " +
                        "'" +
                        req.body.time +
                        "'" +
                        " )";
                    connection.query(
                        query2,
                        function (error, results, fields) {
                            if (error) {
                                apiResponse.message = "User Updated Successfully, Error while updating the History";
                                apiResponse.statuscode = "400";
                                apiResponse.result = error;
                                res.status(400).send(apiResponse);
                            } else {
                                apiResponse.statuscode = "200";
                                apiResponse.message = "User Updated Successfully, Successfully Updated the History";
                                apiResponse.result = results;
                                res.status(200).send(apiResponse);
                            }
                        }
                    );
                }
            });
        }
    });

});

//GET API to Fetch all Users
router.get("/history", (req, res) => {
    connection.query(
        "SELECT * FROM history",
        function (error, results, fields) {
            if (error) {
                apiResponse.message = "Error while connecting database";
                apiResponse.statuscode = "400";
                apiResponse.result = error;
                res.status(400).send(apiResponse);
            } else {
                apiResponse.statuscode = "200";
                apiResponse.message = "Successfully Fetched the History";
                apiResponse.result = results;
                res.status(200).send(apiResponse);
            }
        }
    );
});

//GET API to Fetch a Specific User Data
router.get("/history/:id", (req, res) => {
    var query1 =
        "SELECT * FROM history WHERE history.UserName=" +
        "'" +
        req.params.id +
        "'";
    connection.query(query1, function (error, results, fields) {
        if (error) {
            apiResponse.message = "Error while connecting database";
            apiResponse.statuscode = "400";
            apiResponse.result = error;
            res.status(400).send(apiResponse);
        } else {
            apiResponse.statuscode = "200";
            apiResponse.message = "Successfully Fetched the History";
            apiResponse.result = results;
            res.status(200).send(apiResponse);
        }
    });
});

module.exports = router;