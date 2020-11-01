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

let apiResponse = { "Message": "", "result": "", "statuscode": "" };

//Function to connect to database and execute query
function executeQuery(res, query) {
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            apiResponse.Message = "Error while connecting database"
            apiResponse.statuscode = "400";
            apiResponse.result = err;
            res.send(apiResponse);
        }
        else {
            console.log("Successfuly Connected to the Database :- ");
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, rs) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    apiResponse.Message = "Error while querying database";
                    apiResponse.statuscode = "400";
                    apiResponse.result = err;
                    res.send(err);
                    sql.close();
                }
                else {
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
    let response = executeQuery(res, query);
    apiResponse.statuscode = "200";
    apiResponse.Message = "Successfully Fetched the UserList";
    apiResponse.result = response.recordset
    res.send(apiResponse)
});

//GET API to Fetch a Specific User Data
router.get("/user/:id", (req, res) => {
    console.log("Request Recived for the Get User");
    var query = "select * from [User_Data] where UserName=" + req.params.id;
    let response = executeQuery(res, query);
    apiResponse.statuscode = "200";
    apiResponse.Message = "Successfully Fetched the UserDetails";
    apiResponse.result = response.recordset
    res.send(apiResponse)
});

router.post("/login", (req, res) => {
    console.log(req.body);
    let UserName = req.body.userName;
    let Password = req.body.password;
    console.log(UserName, Password);
    var query = "select * from [User_Data] where UserName=" + "'" + UserName + "'";
    executeQuery(res, query);
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

    var query = "INSERT INTO [User_Data] ( ID, UserName, MobileNo, IssuedBy, IssuedDateTime, Zone, Tower, InTime, OutTime, UserData, Role, Password ) VALUES (  '1' ," + "'" + username + "'" + ",  " + "'" + mobilenumber + "'" + ", " + "'" + issuedBy + "'" + ", " + "'" + issuedDateTime + "'" + ",  " + "'" + zone + "'" + ",  " + "'" + tower + "'" + ",  " + "'" + inTime + "'" + ",  " + "'" + outTime + "'" + ",  " + "'" + userData + "'" + ",  " + "'" + role + "'" + ",  " + "'" + password + "'" + " )";
    executeQuery(res, query);
});

//PUT API
router.put("/user/:id", (req, res) => {
    console.log("Request Recived for the Update User");
    var query = "UPDATE [User_Data] SET OutTime= " + req.body.outTime + " , InTime=  " + req.body.inTime + " , Password= " + req.body.password + "   WHERE Id= " + req.params.id;
    executeQuery(res, query);
});



module.exports = router;