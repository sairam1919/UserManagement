import React from 'react';
import {
    Grid,
    Container,
  } from '@material-ui/core';
  import PeopleIcon from '@material-ui/icons/PeopleOutlined';
  import ViewWeekIcon from '@material-ui/icons/ViewWeekOutlined';
  import PersonOutlineIcon from '@material-ui/icons/PersonOutline'; 
import { MenuCard } from './menuCard';
import GenerateVisitorPass  from './generateVisitorPass';
import EditEmployee from './editEmployee';
class Dashboard  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isGeneratePassOpen: false,
          isAddEmployee: false,
        };
    }
     menuClick = (menu) => {
        this.props.handleMenuClick(menu);
    }
    generatePass = () => {
      this.setState({isGeneratePassOpen : true })
    }

    handleClose = () => {
      this.setState({ isGeneratePassOpen : false, isAddEmployee: false })
    }

    handleAddEmployee = () => {
      this.setState({isAddEmployee : true })

    }
    render() {
    return (
        <Container maxWidth={false} style={{ padding: '5% 1%', overflow: 'hidden'}}>
        {this.state.isGeneratePassOpen ? < GenerateVisitorPass isOpen={this.state.isGeneratePassOpen} handleClose= {() => this.handleClose()} /> : null} 
        {this.state.isAddEmployee ? < EditEmployee isOpen={this.state.isAddEmployee} handleClose= {() => this.handleClose()} /> : null} 

        <Grid
        container
        spacing={10}
      >
        <MenuCard menuLabel="Employees" menuIcon={<PersonOutlineIcon />} menuClick={() => this.menuClick('employees')} />
        <MenuCard menuLabel="Visitors" menuIcon={<PeopleIcon />} menuClick={() => this.menuClick('visitors') } />
        <MenuCard menuLabel="Generate Pass" menuIcon={<ViewWeekIcon />} menuClick={() => this.generatePass() } />
        <MenuCard menuLabel="Create Employee" menuIcon={<ViewWeekIcon />} menuClick={() => this.handleAddEmployee() } />
        </Grid>
        </Container>
    )
}
}
export default Dashboard; 