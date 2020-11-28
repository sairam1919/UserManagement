import React from 'react';
import {
    Grid,
    Container,
  } from '@material-ui/core';
  import PeopleIcon from '@material-ui/icons/PeopleOutlined';
  import ViewWeekIcon from '@material-ui/icons/ViewWeekOutlined';
  import PersonOutlineIcon from '@material-ui/icons/PersonOutline'; 
import {MenuCard } from './menuCard';

class Dashboard  extends React.Component{
    constructor(props) {
        super(props);
    }
     menuClick = (menu) => {
        this.props.handleMenuClick(menu);
    }
    render() {
    return (
        <Container maxWidth={false} style={{ padding: '5% 1%', overflow: 'hidden'}}>
        <Grid
        container
        spacing={10}
      >
        <MenuCard menuLabel="Employees" menuIcon={<PersonOutlineIcon />} menuClick={() => this.menuClick('employees')} />
        <MenuCard menuLabel="Visitors" menuIcon={<PeopleIcon />} menuClick={() => this.menuClick('visitors') } />
        <MenuCard menuLabel="Generate Pass" menuIcon={<ViewWeekIcon />} menuClick={() => this.menuClick('generatepass') } />
        <MenuCard menuLabel="Create Employee" menuIcon={<ViewWeekIcon />} menuClick={() => this.menuClick('createemployee') } />
        </Grid>
        </Container>
    )
}
}
export default Dashboard; 