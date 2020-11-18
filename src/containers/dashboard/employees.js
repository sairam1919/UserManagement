import React, {useState, useEffect} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const Employees = () => {
    const [ searchValue, setSearchValue] = useState('');
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

    let rows = [{
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

const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
}

if(searchValue) {
    rows = rows.filter((item) => {
        return (item.user_name.toLowerCase().indexOf(searchValue) > -1 || item.first_name.toLowerCase().indexOf(searchValue) > -1 || item.last_name.toLowerCase().indexOf(searchValue) > -1)
    });
}

    return (
        <div>
            <div className="active-cyan-4 mb-4" style={{ margin: '20px 20px'}}>
            <input className="form-control mr-3 w-25" type="text" placeholder="Search by first, last and full name" aria-label="Search" onChange={handleSearch}/>
            </div>
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