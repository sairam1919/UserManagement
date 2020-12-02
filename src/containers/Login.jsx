import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Constants from "../Constants";

const Login = (props) => {
  const history = useHistory();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    userData: "",
    errorMessage: "",
    isError: false,
    isUserLoggedIn: false,
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value, isError: false });
  };

  const handleLogin = () => {
    var url = Constants.FETCH_Login_INFO;
    let bdy = {
      ...values,
      userName: values.userName,
      password: values.password,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(bdy),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
          return res.json();
      })
      .then((data) => {
        if(data.statuscode === "200") {
        localStorage.setItem("userDetails", JSON.stringify(data.result));
        localStorage.setItem("isUserLoggedIn", true);
        history.push("/home");
        } else {
          localStorage.setItem("isUserLoggedIn", false);
          setValues({...values, isError: true, errorMessage: data.message});
        }
      });
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="logo-login"> Sign In </div>
        {/* <form href="#"> */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            name="userName"
            className="form-control"
            placeholder="Email"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            className="form-control"
            placeholder="******"
            type="password"
            onChange={handleChange}
          />
        </div>
        {values.isError ? <span className = "Login-ErrorMessage">{values.errorMessage}</span>: ""}
        <div className="form-group">
          <button
            type="submit"
            className="btn-block btn-login"
            onClick={handleLogin}
          >
            {" "}
            Login{" "}
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};
export default Login;
