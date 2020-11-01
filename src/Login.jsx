import React from 'react';
import Constants from "./Constants.js";
import Dashboard from "./Dashboard";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      userData: "",
      errorMessage: "",
      isError: false,
      isUserLoggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin() {
    var url = Constants.FETCH_Login_INFO;
    let bdy = {"userName":this.state.userName,"password":this.state.password};
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
        this.setState({ isError: true, errorMessage: "Unknown Error Occured." });
      }
    }).then(data => {
      if (data && data.recordset.length) {
        if (data.recordset[0].UserName === this.state.userName && data.recordset[0].password === this.state.password) {
          this.setState({ userData: data.recordset[0], isUserLoggedIn: true });
        } else {
          this.setState({ isError: true, errorMessage: "Please Enter Valid User Credentials." });
        }

      }
    })

  }

  handleLogout() {
    this.setState({isUserLoggedIn: false});
  }

  render() {
    return (
      <div>
        {!this.state.isUserLoggedIn ?
          <div className="content">
            <div className="row">
              <div className="label-div"> User Name </div>
              <div className="input-div">
                <input type="text" name="userName" className="text-input" required onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="label-div"> Password </div>
              <div className="input-div">
                <input type="text" name="password" className="text-input" required onChange={this.handleChange} />
              </div>
            </div>
            {this.state.isError ? <div className="row">
              <div className="label-div"> {this.state.errorMessage} </div>
            </div> : ""}
            <div className="gererate-btn-div">
              <input type="submit" className="generate-btn" value="Login" onClick={(e) => this.handleLogin()} />
            </div>
          </div> : <Dashboard
            userData={this.state.userData}
            handleLogout = {this.handleLogout} />}
      </div>
    )
  }
}
export default NameForm; 