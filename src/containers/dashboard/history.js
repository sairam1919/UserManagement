import React, { useState, useEffect } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { ArrowBack, Edit } from "@material-ui/icons";
import Constants from "../../Constants";
import EditAccessRemove from "./editAccessRemove";
import { Button, FormControlLabel,Checkbox, TextField, Drawer} from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';

const history = ({ handleMenuClick, config }) => {
  const [searchValue, setSearchValue] = useState("");

  const [ state, setState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visitData, setVisitData] = useState({});
  const [visitorInfo, setVisitorInfo] = useState([]);
  const handleClose = () => {
    setIsOpen(false);
  };

  const [ filter, setFilter] = useState({
    expiryDate: '',
    locations: []
  })
  useEffect(() => {
    var url = Constants.FETCH_ALL_VISITORS;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setVisitorInfo(data.result);
        }
      });
  }, []);

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
  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        onClick={() => {
          setVisitData(row);
          setIsOpen(true);
        }}
      >
        <Edit />
      </Button>
    );
  };
  const columns = [
    {
      dataField: "first_name",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "UserName",
      text: "ID Number",
      sort: true,
    },
    {
      dataField: "ExpairyDate",
      text: "Validity",
      sort: true,
    },
    {
      dataField: "Current_Location",
      text: "Current Location",
      sort: true,
    },
    {
      dataField: "AccessRemove",
      text: "Access / Remove",
      formatter: (cell, row, rowIndex, formatExtraData) =>
        linkFollow(cell, row, rowIndex, formatExtraData),
    },
  ];

  let rows = visitorInfo;
  // const uniqueLocations = [...new Set(visitorInfo.map(item => item.Current_Location))];
  let zones = JSON.parse(config).Zones;
  
  if (searchValue) {
    rows = rows.filter((item) => {
      return (
       (item.id_number && item.id_number.toString().toLowerCase().indexOf(searchValue) > -1) ||
       (item.first_name && item.first_name.toLowerCase().indexOf(searchValue) > -1) ||
       (item.last_name && item.last_name.toLowerCase().indexOf(searchValue) > -1)
      );
    });
  }

  if(filter.locations && filter.locations.length) {
    rows = rows.filter((item) => {
        return filter.locations.includes(item)
    });
  }

  if(filter.expiryDate) {
    rows = rows.filter((item) => {
      var g1 = new Date(item.ExpairyDate); 
      var g2 = new Date(filter.expiryDate); 
    return (g1.getTime() <= g2.getTime())
    });
  }




  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const handleCheckBox = (event) => {
    if(event.target.checked) {
      const updatedFilter = {
          ...filter,
          locations: filter.locations.concat(event.target.name)
      };
      setFilter(updatedFilter);
    } else {
      const updatedFilter = {
        ...filter,
        locations: filter.locations && filter.locations.length ? filter.locations.filter( item => item !== event.target.name) : []
    };
    setFilter(updatedFilter);
    }
  };

  const handleChange = (event) => {
    setFilter({ ...filter, expiryDate: event.target.value})
  }

  const handleApply = (e) => {
    e.preventDefault();
    (e) => toggleDrawer(false);
  }
  
  return (
    <div>
       
      {isOpen ? (
        <EditAccessRemove
          isOpen={isOpen}
          visitData={visitData}
          handleClose={handleClose}
          handleAssignRemove={(e) => handleAssignRemove(e)}
          config = {config}
        />
      ) : null}
      <div
        style={{
          margin: "20px",
          fontSize: 18,
          fontWeight: 500,
          cursor: "pointer",
        }}
        onClick={handleMenuClick}
      >
        <ArrowBack /> Back
      </div>
      <div  style={{ margin: "20px 20px", display: 'inline-block' }}>
        <input
          type="text"
          style={{width: 450,height: 50 }}
          placeholder="Search by id, first and last Name"
          aria-label="Search"
          onChange={handleSearch}
        />
      </div>
      <div  style={{ margin: "20px 20px", display: 'inline-block' }}>
      <Button onClick={toggleDrawer(true)} style={{ backgroundColor: '#364153', borderRadius: 4, width: 200, height: 40,  color: "#FFFFFF"}}> <FilterListIcon /> {' '}Filter</Button>
      </div>

          <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)} style={{ width: 500 }}>
            <h3>  <FilterListIcon /> Filter </h3>
            <hr/>
            <TextField
              type="date"
                    label="Validity Date"
                    placeholder="Validity Date"
                    fullWidth margin="normal"
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    variant="outlined"
                    name="expiryDate"
                    value={filter.expiryDate}
                    onChange={handleChange}
                />
            {zones.map(zone => <
                            FormControlLabel 
                            // value={filter.locations}
                            control={< Checkbox color="primary"
                                id={zone.name}
                                checked={filter.locations.includes(zone.name)}
                            />}
                            label={zone.name}
                            labelPlacement="end"
                            name={zone.name}
                            onChange={handleCheckBox}
                        />
                        )
                      }

                      <div style={{ position: 'fixed', bottom: 0, background: '#560de4' }}>
                        <Button style={{ fontSize: 20, width: 500, color: '#fff'}} onClick={toggleDrawer(false)}>Apply Filter</Button>
                      </div>
          </Drawer>
      <BootstrapTable
        keyField={columns[2].dataField}
        data={rows}
        columns={columns}
        wrapperClasses="table-responsive"
        noDataIndication="NO DATA"
        striped
        hover
        bordered={false}
        condensed
      />
    </div>
  );
};

export default history;