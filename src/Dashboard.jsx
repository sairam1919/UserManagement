import React from 'react';
import Constants from "./Constants.js"
import CreateEmployee from './createEmployee.js';
import GenerateVisitorPass from './generateVisitorPass.js';
import UserInfo from './userInfo.jsx';
import Navbar from './Navbar.jsx';
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: "",
            isOptionSelected: false,
            currentComponent: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleClick(option) {
        console.log("option", option);
        switch (option) {
            case "createEmployee": this.setState({ isOptionSelected: true, currentComponent: <CreateEmployee handleBackButton={this.handleBackButton} /> })
                break;
            case "generateVisitorPass": this.setState({ isOptionSelected: true, currentComponent: <GenerateVisitorPass handleBackButton={this.handleBackButton} /> })
                break;
            case "userInfo": this.setState({ isOptionSelected: true, currentComponent: <UserInfo handleBackButton={this.handleBackButton} /> })
                break;
        }
    }

    handleBackButton() {
        console.log("Inside the BackButton method");
        this.setState({ isOptionSelected: false })
    }

    fetachUserList() {
        var url = Constants.FETCH_ALL_USERS;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                this.setState({ isError: true, errorMessage: "No User Data Found." })
            }
        }).then(data => {
            if (data) {
                this.setState({ userList: data });
            }
        })

    }
    handleLogout() {
        this.props.handleLogout();
    }

    render() {
        const { userData } = this.props;
        let isAdmin = false;
        if(userData.Role === "Admin") {
            isAdmin = true;
        }
        return (
            <div>
                <Navbar userData = {userData}
                handleLogout = {this.handleLogout}
                />
                {!this.state.isOptionSelected ?
                    <div className = "dashboard-div">
                        <div className="row">
                            <span className="dashboard-btn" onClick={() => this.handleClick("createEmployee")}>Create Employee</span>
                            <span className="dashboard-btn" onClick={() => this.handleClick("generateVisitorPass")}>Generate Visitor Pass</span>
                            {isAdmin ? <span className="dashboard-btn" onClick={() => this.handleClick("userInfo")}>User Info</span> : ""}
                        </div>
                    </div> : this.state.currentComponent}
            </div>

        )
    }
}
export default Dashboard; 