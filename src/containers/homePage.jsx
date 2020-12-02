import React, { useState } from 'react';
import Employees from './dashboard/employees';
import Visitors from './dashboard/visitors';
import Dashboard from './dashboard/Dashboard'

const HomePage = (props) => {
    const [currentComponent,setCurrentComponent] = useState('dashboard');
    const handleMenuClick = (option) => {
        setCurrentComponent(option);
    }
    let renderComponent = null;
    switch (currentComponent) {
        case "dashboard":
            renderComponent = <Dashboard handleMenuClick={(menu) => handleMenuClick(menu)}/>;
            break;
        case "employees":
            renderComponent = <Employees handleMenuClick={() => handleMenuClick('dashboard')}/>;
            break;
        case "visitors":
            renderComponent = <Visitors handleMenuClick={() => handleMenuClick('dashboard')}/>;
            break;
        default:
            renderComponent = <Dashboard handleMenuClick={() => handleMenuClick('dashboard')}/>;
            break;
    }
    return (<div>{renderComponent}</div>);
}
export default HomePage; 