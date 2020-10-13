const express = require('express');
const router = express.Router();
var sql = require("mssql");

//Initiallising connection string
var dbConfig = {
    user: "portaluser",
    password: "MerckApp1@",
    server: "localhost",
    database: "UserManagement"
};


//Function to connect to database and execute query
var executeQuery = function (res, query) {
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            console.log("Successfuly Connected to the Database :- ");
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, rs) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                    sql.close();
                }
                else {
                    console.log("Response Sent Successfuly- ");
                    res.send(rs);
                    sql.close();
                }
            });
        }
    });
}


//GET API to Fetch all Users
router.get("/user", (req, res) => {
    console.log("Request Recived for the Get All Users");
    var query = "select * from [User_Data]";
    executeQuery(res, query);
});

//GET API to Fetch a Specific User Data
router.get("/user/:id", (req, res) => {
    console.log("Request Recived for the Get User");
    var query = "select * from [User_Data] where UserName=" + req.params.id;
    executeQuery(res, query);
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
    let role = req.body.role;

    var query = "INSERT INTO [User_Data] ( ID, UserName, MobileNo, IssuedBy, IssuedDateTime, Zone, Tower, InTime, OutTime, UserData, Role ) VALUES (  '1' ," + "'" + username + "'" + ",  " + "'" + mobilenumber + "'" + ", " + "'" + issuedBy + "'" + ", " + "'" + issuedDateTime + "'" + ",  " + "'" + zone + "'" + ",  " + "'" + tower + "'" + ",  " + "'" + inTime + "'" + ",  " + "'" + outTime + "'" + ",  " + "'" + userData + "'" +  ",  " + "'" + role + "'" +")";
    executeQuery(res, query);
});

//PUT API
router.put("/user/:id", (req, res) => {
    console.log("Request Recived for the Update User");
    var query = "UPDATE [User_Data] SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + "  WHERE Id= " + req.params.id;
    executeQuery(res, query);
});



module.exports = router;