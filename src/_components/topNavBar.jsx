import React from 'react';
import { ExitToApp } from '@material-ui/icons';
import { useHistory } from "react-router-dom";

export function TopNavBar({showLogOut, userDetails}) {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('userDetails');
        localStorage.setItem('isUserLoggedIn', false);
        history.push('/');
    }
    return (
        <div style={{ height:70, width: window.innerWidth, background: '#364153', color: '#fff'}}>
        <div className="header-logo" style={{ display: 'inline-block'}} />
        {showLogOut ? <div style={{ display: 'inline-block', right: 100, top: 10 , position: 'absolute'}}> <div> {userDetails.UserName} </div> <div> {userDetails.Role} </div></div> : null}
        {showLogOut ? <div style={{ display: 'inline-block', right: 20, top: 10, position: 'absolute' }} onClick = {handleLogout}> <ExitToApp /> </div> : null}
       </div>
    );
}