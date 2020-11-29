import React, {useState} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { ArrowBack } from '@material-ui/icons';

const Visitors = ({handleMenuClick}) => {
  const [ searchValue, setSearchValue] = useState('');
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

        let rows= [{
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
    ];

    if(searchValue) {
      rows = rows.filter((item) => {
          return (item.id_number.toString().toLowerCase().indexOf(searchValue) > -1 || item.first_name.toLowerCase().indexOf(searchValue) > -1 || item.last_name.toLowerCase().indexOf(searchValue) > -1)
      });   
  }
  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
}
    return (
        <div>
                      <div style={{ margin:'20px', fontSize: 18, fontWeight: 500,  cursor: 'pointer' }} onClick={handleMenuClick}><ArrowBack />{' '}Back</div>

            <div className="active-cyan-4 mb-4" style={{ margin: '20px 20px'}}>
            <input className="form-control mr-3 w-25" type="text" placeholder="Search by id, first and last Name" aria-label="Search" onChange={handleSearch}/>
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
              condensed /> 
        </div>
    );
}
export default Visitors; 