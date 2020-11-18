import React, { useState} from 'react';
import { useHistory} from 'react-router-dom';

const Login = () => {
  const history = useHistory ();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    userData: "",
    errorMessage: "",
    isError: false,
    isUserLoggedIn: false
  });

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  }

  const handleLogin = () => {
    history.push("/home");
    // var url = Constants.FETCH_Login_INFO;
    // let bdy = {"userName":this.state.userName,"password":this.state.password};
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(bdy),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(res => {
    //   if (res.status === 200) {
    //     return res.json();
    //   } else {
    //     this.setState({ isError: true, errorMessage: "Unknown Error Occured." });
    //   }
    // }).then(data => {
    //   if (data && data.recordset.length) {
    //     if (data.recordset[0].UserName === this.state.userName && data.recordset[0].password === this.state.password) {
    //       this.setState({ userData: data.recordset[0], isUserLoggedIn: true });
    //     } else {
    //       this.setState({ isError: true, errorMessage: "Please Enter Valid User Credentials." });
    //     }

    //   }
    // });

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