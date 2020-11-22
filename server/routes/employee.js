const express = require('express');
const router = express.Router();
const sql = require("mssql");
const fs = require("fs");
const server = require("../server");


//Initialling connection string
var dbConfig = {
    user: "portaluser",
    password: "MerckApp1@",
    server: "localhost",
    database: "UserManagement"
};

let apiResponse = { "message": "", "result": "", "statuscode": "" };


//GET API to Fetch all Users
router.get("/user", (req, res) => {
    var query = "select * from [Employee]";
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = err;
            res.send(apiResponse);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, rs) {
                if (err) {
                    apiResponse.message = "Error while querying database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = err;
                    res.send(err);
                    sql.close();
                }
                else {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "Successfully Fetched the UserDetails";
                    apiResponse.result = rs.recordset
                    res.send(apiResponse);
                    sql.close();
                }
            });
        }
    });
});

//GET API to Fetch a Specific User Data
router.get("/user/:id", (req, res) => {
    var query = "select * from [Employee] where UserName=" + req.params.id;
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = err;
            res.send(apiResponse);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, rs) {
                if (err) {
                    apiResponse.message = "Error while querying database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = err;
                    res.send(err);
                    sql.close();
                }
                else {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "Successfully Fetched the UserDetails";
                    apiResponse.result = rs.recordset
                    res.send(apiResponse);
                    sql.close();
                }
            });
        }
    });
});

router.post("/login", (req, res) => {
    let UserName = req.body.userName;
    let Password = req.body.password;
    var query = "select * from [Employee] where UserName=" + "'" + UserName + "'";
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = err;
            res.send(apiResponse);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, rs) {
                if (err) {
                    apiResponse.message = "Error while querying database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = err;
                    res.send(err);
                    sql.close();
                }
                else {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "User Authenticated Successfully";
                    apiResponse.result = rs.recordset
                    res.send(apiResponse);
                    sql.close();
                }
            });
        }
    });
})

router.get("/fetchConfig", (req, res) => {
    let data = fs.readFileSync('server/routes/config.json',
        { encoding: 'utf8', flag: 'r' });
    res.send(data);
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

    var query = "INSERT INTO [Employee] ( ID, UserName, MobileNo, IssuedBy, IssuedDateTime, Zone, Tower, InTime, OutTime, UserData, Role, Password ) VALUES (  '1' ," + "'" + username + "'" + ",  " + "'" + mobilenumber + "'" + ", " + "'" + issuedBy + "'" + ", " + "'" + issuedDateTime + "'" + ",  " + "'" + zone + "'" + ",  " + "'" + tower + "'" + ",  " + "'" + inTime + "'" + ",  " + "'" + outTime + "'" + ",  " + "'" + userData + "'" + ",  " + "'" + role + "'" + ",  " + "'" + password + "'" + " )";
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = err;
            res.send(apiResponse);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, rs) {
                if (err) {
                    apiResponse.message = "Error while querying database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = err;
                    res.send(err);
                    sql.close();
                }
                else {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "User Created Successfully";
                    apiResponse.result = ""
                    res.send(apiResponse);
                    sql.close();
                }
            });
        }
    });
});

//PUT API
router.put("/user/:id", (req, res) => {
    console.log("Request Received for the Update User");
    var query = "UPDATE [Employee] SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " , Password= " + req.body.password + "   WHERE Id= " + req.params.id;
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            apiResponse.message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = err;
            res.send(apiResponse);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, rs) {
                if (err) {
                    apiResponse.message = "Error while querying database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = err;
                    res.send(err);
                    sql.close();
                }
                else {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "User Updated Successfully";
                    apiResponse.result = ""
                    res.send(apiResponse);
                    sql.close();
                }
            });
        }
    });
});

router.post("/updateUserInfo", (req, res) => {
                    apiResponse.statuscode = "200";
                    apiResponse.message = "User Updated Successfully";
                    apiResponse.result = "";
                    console.log("Api response: ", apiResponse);
                    let ws = server.Server();
                    ws.connections.forEach((conn) => conn.send(apiResponse));
                    res.send(apiResponse);
    // var query = "select * from [Employee]";
    // var query = "UPDATE [Employee] SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " , Password= " + req.body.password + "   WHERE Id= " + req.params.id;
    // sql.connect(dbConfig, (err) => {
    //     if (err) {
    //         console.log("Error while connecting database :- " + err);
    //         apiResponse.message = "Error while connecting database"
    //         apiResponse.statuscode = "400";
    //         apiResponse.result = err;
    //         res.send(apiResponse);
    //     }
    //     else {
    //         var request = new sql.Request();
    //         request.query(query, function (err, rs) {
    //             if (err) {
    //                 apiResponse.message = "Error while querying database";
    //                 apiResponse.statuscode = "400";
    //                 apiResponse.result = err;
    //                 res.send(err);
    //                 sql.close();
    //             }
    //             else {
    //                 apiResponse.statuscode = "200";
    //                 apiResponse.message = "User Updated Successfully";
    //                 apiResponse.result = ""
    //                 let ws = server.Server();
    //                 ws.wsServer.on('message', function (message) {
    //                     connections.forEach((conn) => conn.send(apiResponse))
    //                 });
    //                 res.send(apiResponse);
    //                 sql.close();
    //             }
    //         });
    //     }
    // });
});


module.exports = router;