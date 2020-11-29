import React from 'react';
import { ExitToApp } from '@material-ui/icons';
export function TopNavBar({showLogOut}) {
    return (
        <div style={{ height:70, width: window.innerWidth, background: '#364153', color: '#fff'}}>
        <div className="header-logo" style={{ display: 'inline-block'}} />
        {showLogOut ? <div style={{ display: 'inline-block', right: 100, top: 10 , position: 'absolute'}}> <div> Steve Smith </div> <div> Administrator </div></div> : null}

        {showLogOut ? <div style={{ display: 'inline-block', right: 20, top: 10, position: 'absolute' }}> <ExitToApp /> </div> : null}
       </div>
    );
}