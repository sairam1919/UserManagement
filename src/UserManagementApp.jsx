import React, { Component } from "react";
import { connect } from 'react-redux';
import { signInUser } from "./services/SignInService";
import SignIn from "./container/Login/SignIn/SignIn";
import SingUp from "./container/Login/SignUp/SignUp";
import { Switch, Route, Redirect } from 'react-router-dom';

export class UserManagementApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignIn: true,
            isSignUp: false,
            userDetails: {}
        };
        //Binding events
        this.goToSignUpPage = this.goToSignUpPage.bind(this);
        this.goToSignInPage = this.goToSignInPage.bind(this);
    }

    goToSignUpPage() {
        this.setState({ isSignIn: false, isSignUp: true });
    }
    goToSignInPage() {
        this.setState({ isSignIn: true, isSignUp: false });
    }
    render() {
        const loginForm = (
            <div className="home-page-container" >
                <h4 className={this.state.isSignIn ? "heading" : "heading float-right"}> JARA </h4>
                {this.state.isSignIn ?
                    <SignIn goToSignUpPage={this.goToSignUpPage}
                        ></SignIn>
                    : ""
                }
                {this.state.isSignUp ?
                    <SingUp goToSignInPage={this.goToSignInPage}></SingUp>
                    : ""
                }
            </div>
        );
        return (
            <div>
                {this.props.signInData.isLogin
                    ? 
                    <Redirect to='/homePage' 
                    />
                    : loginForm
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signInData: state.signInData
    };
};

/**
 * mapDispatchToProps - receives the dispatch() method and returns callback back props to use in component
 */
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (data) => dispatch(signInUser(data))
    };
};

/**
* connect() method connects component to redux store
*/
export default connect(mapStateToProps, mapDispatchToProps)(UserManagementApp);