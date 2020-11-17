import React, {useState, useEffect} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const Employees = () => {
    const columns = [
        {
          dataField: 'user_name',
          text: 'User Name',
          sort: true
        },
        {
            dataField: 'first_name',
            text: 'First Name',
            sort: true

          },
          {
            dataField: 'last_name',
            text: 'Last Name',
            sort: true

          },
          {
            dataField: 'role',
            text: 'Role',
            sort: true

          },
    ];

    const rows = [{
        user_name: "HawkinsA",
        first_name: "Arthur",
        last_name: "Hawkins",
        role: "Admin"
    },
    {
        user_name: "WarrenC",
        first_name: "Colleen",
        last_name: "Warren",
        role: "Admin"
    },
    {
        user_name: "LaneC",
        first_name: "Colleen",
        last_name: "Lane",
        role: "Admin"
    },
    {
        user_name: "RichardsA",
        first_name: "Angel",
        last_name: "Richards",
        role: "Admin"
    },
];
    return (
        <div>
             <BootstrapTable
              keyField={columns[0].dataField}
              data={rows}
              columns={columns}
              wrapperClasses="table-responsive"
              noDataIndication="NO DATA"
              striped
              hover
              bordered={false}
              condensed /> 
        </div>
    );
}
export default Employees; 