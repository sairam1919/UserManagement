import React, { useState } from 'react';
import Employees from './employees';
import Visitors from './visitors';

const Dashboard = () => {
    const [currentComponent, setCurrentComponent] = useState("employees");
    const handleClick = (option) => {
        setCurrentComponent(option);
    }
    let renderComponent = null;
    switch (currentComponent) {
        case "employees":
            renderComponent = <Employees />;
            break;
        case "visitors":
            renderComponent = <Visitors />;
            break;
        default:
            renderComponent = <Employees />;
            break;
    }
    return (
        <div className="container-fluid">
                    <div style ={{ display: 'inline-block'}}>
      <span className={ currentComponent === 'employees' ? "active-menu" : "nonactive-menu"}><a onClick={()=>handleClick('employees')}>Employees</a></span>
      <span className={ currentComponent === 'visitors' ? "active-menu" : "nonactive-menu"}><a onClick={() =>handleClick('visitors')}>Visitors</a></span>
    </div>
            {renderComponent}
        </div>
    )
}
export default Dashboard; 