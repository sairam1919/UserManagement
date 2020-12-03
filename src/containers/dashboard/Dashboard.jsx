import React from "react";
import { Grid, Container } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { MenuCard } from "./menuCard";
import GenerateVisitorPass from "./generateVisitorPass";
import EditEmployee from "./editEmployee";
import ChangePassword from "./changePassword";
import Constants from "../../Constants";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeneratePassOpen: false,
      isAddEmployee: false,
      isChangePassword: false,
    };
  }
  menuClick = (menu) => {
    this.props.handleMenuClick(menu);
  };
  generatePass = () => {
    this.setState({ isGeneratePassOpen: true });
  };

  handleClose = () => {
    this.setState({
      isGeneratePassOpen: false,
      isAddEmployee: false,
      isChangePassword: false,
    });
  };

  handleAddEmployee = () => {
    this.setState({ isAddEmployee: true });
  };
  handleChangePassword = () => {
    this.setState({ isChangePassword: true });
  };
  handlePasswordUpdate = (bdy) => {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var url = Constants.CHANGE_PASSWORD + userDetails.UserID;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(bdy),
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
      this.handleClose();
  };
  render() {
    return (
      <Container
        maxWidth={false}
        style={{ padding: "5% 1%", overflow: "hidden" }}
      >
        {this.state.isGeneratePassOpen ? (
          <GenerateVisitorPass
            isOpen={this.state.isGeneratePassOpen}
            handleClose={() => this.handleClose()}
          />
        ) : null}
        {this.state.isAddEmployee ? (
          <EditEmployee
            isOpen={this.state.isAddEmployee}
            handleClose={() => this.handleClose()}
          />
        ) : null}
        {this.state.isChangePassword ? (
          <ChangePassword
            isOpen={this.state.isChangePassword}
            handlePasswordUpdate={(e) => this.handlePasswordUpdate(e)}
            handleClose={() => this.handleClose()}
          />
        ) : null}

        <Grid container spacing={10}>
          <MenuCard
            menuLabel="Employees"
            menuIcon={<PersonOutlineIcon />}
            menuClick={() => this.menuClick("employees")}
          />
          <MenuCard
            menuLabel="Visitors"
            menuIcon={<PeopleIcon />}
            menuClick={() => this.menuClick("visitors")}
          />
          <MenuCard
            menuLabel="Generate Pass"
            menuIcon={<ContactMailIcon />}
            menuClick={() => this.generatePass()}
          />
          <MenuCard
            menuLabel="Create Employee"
            menuIcon={<PersonAddIcon />}
            menuClick={() => this.handleAddEmployee()}
          />
          <MenuCard
            menuLabel="Change Password"
            menuIcon={<VpnKeyIcon />}
            menuClick={() => this.handleChangePassword()}
          />
        </Grid>
      </Container>
    );
  }
}
export default Dashboard;
