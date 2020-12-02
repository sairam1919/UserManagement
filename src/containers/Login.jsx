import React, { useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import Constants from '../Constants';

const Login = (props) => {
  const history = useHistory ();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    userData: "",
    errorMessage: "",
    isError: false,
    isUserLoggedIn: false
  });

  useEffect(() => {
        localStorage.clear();
  },[]);

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  }

  const handleLogin = () => {
    var url = Constants.FETCH_Login_INFO;
    let bdy = {...values, "userName":values.userName,"password":values.password};
    fetch(url, {
      method: "POST",
      body: JSON.stringify(bdy),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        this.setState({ isError: true, errorMessage: "Unknown Error Occurred." });
      }
    }).then(data => {

        data = 
        {
              "message": "User Authenticated Successfully",
              "result": [
                  {
                      "Id": 1,
                      "UserName": "TestUser",
                      "MobileNo": "9948331372",
                      "IssuedBy": "parvez",
                      "IssuedDateTime": "11-23-2020",
                      "Zone": "Zone2",
                      "Tower": "Tower2",
                      "InTime": "",
                      "OutTime": "",
                      "UserData": "{}",
                      "Role": "Admin",
                      "password": "password",
                      "Current_Location": "Zone1, Tower 1",
                      "UserID": "Test@9948331372",
                      "UserPass": "Test9948",
                  }
                ]};

                localStorage.setItem('userDetails', data);
    //   {
    //     "message": "User Authenticated Successfully",
    //     "result": [
    //         {
    //             "Id": 1,
    //             "UserName": "TestUser",
    //             "MobileNo": "9948331372",
    //             "IssuedBy": "parvez",
    //             "IssuedDateTime": "11-23-2020",
    //             "Zone": "Zone2",
    //             "Tower": "Tower2",
    //             "InTime": "",
    //             "OutTime": "",
    //             "UserData": "{}",
    //             "Role": "Admin",
    //             "password": "password",
    //             "Current_Location": "Zone1, Tower 1",
    //             "UserID": "Test@9948331372",
    //             "UserPass": "Test9948",
    //             "UserImage": {
    //                 "type": "Buffer",
    //                 "data": [
    //                     49,
    //                     48,
    //                     48,
    //                     49,
    //                     48,
    //                     48,
    //                     49,
    //                     48,
    //                     49,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0
    //                 ]
    //             },
    //             "UserIDProof": {
    //                 "type": "Buffer",
    //                 "data": [
    //                     49,
    //                     48,
    //                     48,
    //                     49,
    //                     48,
    //                     48,
    //                     49,
    //                     48,
    //                     49,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0
    //                 ]
    //             },
    //             "UserIDProofNumber": "100100101",
    //             "PassImage": {
    //                 "type": "Buffer",
    //                 "data": [
    //                     49,
    //                     48,
    //                     48,
    //                     49,
    //                     48,
    //                     48,
    //                     49,
    //                     48,
    //                     49,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0,
    //                     0
    //                 ]
    //             },
    //             "ExpairyDate": "26-11-2020"
    //         }
    //     ],
    //     "statuscode": "200"
    // }
      history.push("/home");
    });

  }

    return (
      <div className="login-container">
      <div className="container">
        <div className="logo-login"> Sign In </div>
          {/* <form href="#"> */}
    <div className="form-group">
    	<label>Email Address</label>
        <input name="userName" className="form-control" placeholder="Email" type="email" onChange={handleChange} />
    </div> 
    <div className="form-group">
    	<label>Password</label>
        <input name="password" className="form-control" placeholder="******" type="password" onChange={handleChange}/>
    </div>  
    <div className="form-group">
        <button type="submit" className="btn-block btn-login" onClick={handleLogin}> Login  </button>
    </div>                                                          
      {/* </form> */}
      </div>
      </div>
    );
}
export default Login; 