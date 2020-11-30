import React, { useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { ArrowBack, Edit } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import EditEmployee from './editEmployee';
import Constants from '../../Constants';

let rows = [];
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
    this.setState({ isError: true, errorMessage: "Unknown Error Occurred." });
  }
}).then(data => {
  if (data) {
    rows = data.result;
  }
});

const Employees = ({ handleMenuClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [empData, setEmpData] = useState({});
  const columns = [
    {
      dataField: 'UserName',
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
      dataField: 'Role',
      text: 'Role',
      sort: true

    },
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cell, row, rowIndex, formatExtraData) => linkFollow(cell, row, rowIndex, formatExtraData),
    }
  ];

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {
          setEmpData(row);
          setIsOpen(true);
        }}
      >
        <Edit />
      </Button>
    );
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  if (searchValue) {
    rows = rows.filter((item) => {
      return (item.user_name.toLowerCase().indexOf(searchValue) > -1 || item.first_name.toLowerCase().indexOf(searchValue) > -1 || item.last_name.toLowerCase().indexOf(searchValue) > -1)
    });
  }

  return (
    <div>
      {isOpen ?
        <EditEmployee isOpen={isOpen} empData={empData} handleClose={handleClose} />
        :
        null
      }
      <div style={{ margin: '20px', fontSize: 18, fontWeight: 500, cursor: 'pointer' }} onClick={handleMenuClick}><ArrowBack />{' '}Back</div>
      <div className="active-cyan-4 mb-4" style={{ margin: '20px 20px' }}>
        <input className="form-control mr-3 w-25" type="text" placeholder="Search by first, last and full name" aria-label="Search" onChange={handleSearch} />
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