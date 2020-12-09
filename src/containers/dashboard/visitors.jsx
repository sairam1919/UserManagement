import React, { useState, useEffect } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { ArrowBack } from "@material-ui/icons";
import Constants from "../../Constants";
import EditAccessRemove from "./editAccessRemove";
import { Button } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

const Visitors = ({ handleMenuClick }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [visitData, setVisitData] = useState({});
  const [visitorInfo, setVisitorInfo] = useState([]);
  const handleClose = () => {
    setIsOpen(false);
  };
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
  }, [])
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
  if (searchValue) {
    rows = rows.filter((item) => {
      return (
        item.id_number.toString().toLowerCase().indexOf(searchValue) > -1 ||
        item.first_name.toLowerCase().indexOf(searchValue) > -1 ||
        item.last_name.toLowerCase().indexOf(searchValue) > -1
      );
    });
  }
  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };
  return (
    <div>
      {isOpen ? (
        <EditAccessRemove
          isOpen={isOpen}
          visitData={visitData}
          handleClose={handleClose}
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
      <div className="active-cyan-4 mb-4" style={{ margin: "20px 20px" }}>
        <input
          className="form-control mr-3 w-25"
          type="text"
          placeholder="Search by id, first and last Name"
          aria-label="Search"
          onChange={handleSearch}
        />
      </div>
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
export default Visitors;
