import React from 'react';
import Constants from "./Constants.js"
import './Navbar.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.handleLogout();
    }

    render() {
        const { userData } = this.props;
        console.log("userData", userData);
        return (
            <div>
                <ul>
                    <li><a className = "nav-item" href="#">Company Logo</a></li>
                    <li><a className = "nav-item" href="#">Company Name</a></li>
                    <li className="dropdown">
                <a href="javascript:void(0)" class="dropbtn">{userData.UserName}</a>
                        <div class="dropdown-content">
                            <a href="#">Help </a>
                            <a href="#">About</a>
                            <a href="#" onClick = {() => this.handleLogout()}>Logout</a>
                        </div>
                    </li>
                </ul>
            </div>

        )
    }
}
export default Navbar; 