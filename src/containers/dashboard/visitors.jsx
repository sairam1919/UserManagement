import React, {useState, useEffect} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const Visitors = () => {
    const [ rows, setRows] = useState([]);
    const columns = [
        {
            dataField: 'first_name',
            text: 'First Name',
            sort: true,
          },
          {
            dataField: 'last_name',
            text: 'Last Name',
            sort: true,

          },
          {
            dataField: 'id_number',
            text: 'ID Number',
            sort: true,
          },
          {
            dataField: 'validity',
            text: 'Validity',
            sort: true,
          },
          {
            dataField: 'current_location',
            text: 'Current Location',
            sort: true,
          },
    ];

    useEffect(() => {
        setRows( [{
            first_name: "Arthur",
            last_name: "Hawkins",
            id_number: 43756,
            validity: "03/21/2019 06.27 PM",
            current_location: "building 1"
        },
        {
            first_name: "Colleen",
            last_name: "Warren",
            id_number: 22739,
            validity: "02/27/2019 04.38 PM",
            current_location: "building 3"
    
        },
        {
            first_name: "Colleen",
            last_name: "Lane",
            id_number: 70668,
            validity: "02/23/2019 02.38 PM",
            current_location: "building 1"
    
        },
        {
            first_name: "Angel",
            last_name: "Richards",
            id_number: 97174,
            validity: "10/08/2019 05.38 PM",
            current_location: "building 2"
    
        },
    ]);
    },[]);
    return (
        <div>
            <BootstrapTable
              keyField={columns[2].dataField}
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
export default Visitors; 