import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { ArrowBack, Edit } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import EditEmployee from './editEmployee';
import Constants from '../../Constants';
import EditAccessRemove from "./editAccessRemove";

const Employees = ({ handleMenuClick, handleSaveEmployee, config }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [empData, setEmpData] = useState({});
  const [empInfo, setEmpInfo] = useState([]);
const [isAccessOpen, setIsAccessOpen] =useState(false);
const[ accessLocations, setAccessLocations] =useState({});
  useEffect(() => {
    var url = Constants.FETCH_ALL_USERS;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(data => {
      if (data) {
        setEmpInfo(data.result);
      }
    });
  }, []);
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
      dataField: 'Current_Location',
      text: 'Current Location',
      sort: true
    },
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cell, row, rowIndex, formatExtraData) => linkFollow(cell, row, rowIndex, formatExtraData),
    },
    {
      dataField: "AccessRemove",
      text: "Access / Remove",
      formatter: (cell, row, rowIndex, formatExtraData) =>
      linkFollowAccessRemove(cell, row, rowIndex, formatExtraData),
    },
  ];

  const linkFollowAccessRemove = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {
          setAccessLocations(row);
          setIsAccessOpen(true);
        }}
      >
        <Edit />
      </Button>
    );
  };

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
    setIsAccessOpen(false);
  }

  let rows = empInfo;
  if (searchValue) {
    rows = rows.filter((item) => {
      return (item.user_name.toLowerCase().indexOf(searchValue) > -1 || item.first_name.toLowerCase().indexOf(searchValue) > -1 || item.last_name.toLowerCase().indexOf(searchValue) > -1)
    });
  }

  const handleAssignRemove = (data) => {
    var url = Constants.UPDATE_VISITOR + data.UserName;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert(res.message);
        }
      })
      .then((data) => {
        alert(data.message);
      });
  }

  return (
    <div>
       {isAccessOpen ? (
        <EditAccessRemove
          isOpen={isAccessOpen}
          visitData={accessLocations}
          handleClose={handleClose}
          handleAssignRemove={(e) => handleAssignRemove(e)}
          config = {config}
        />
      ) : null}
      {isOpen ?
        <EditEmployee isOpen={isOpen} empData={empData} isEditUser = {true} handleClose={handleClose} handleSaveEmployee = {handleSaveEmployee} config = {config} />
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