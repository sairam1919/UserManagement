import React, { useState, useEffect } from "react";
import Employees from "./dashboard/employees";
import Visitors from "./dashboard/visitors";
import Dashboard from "./dashboard/Dashboard";
import Constants from "../Constants";

const HomePage = (props) => {
  const [currentComponent, setCurrentComponent] = useState("dashboard");
  const [config, setConfig] = useState({});
  const [values, setValues] = useState({
    isGeneratePassOpen: false,
    isAddEmployee: false,
    isChangePassword: false,
  });

  const handleMenuClick = (option) => {
    setCurrentComponent(option);
  };

  const handleAddEmployee = () => {
    setValues({ ...values, isAddEmployee: true });
  };
  const handleChangePassword = () => {
    setValues({ ...values, isChangePassword: true });
  };
  const generatePass = () => {
    console.log("Inside the GeneratePass Dashboard");
    setValues({ ...values, isGeneratePassOpen: true });
  };

  const handleClose = () => {
    setValues({
      ...values,
      isAddEmployee: false,
      isChangePassword: false,
      isGeneratePassOpen: false,
    });
  };

  useEffect(() => {
    var url = Constants.FETCH_CONFIG;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statuscode === "200") {
          setConfig(data.result);
        } else {
          setConfig({});
        }
      });
  }, {});

  const handleSaveEmployee = (obj) => {
    if (!obj.isEditUser) {
      let url = Constants.SAVE_EMPLOYEE;
      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj.addUserObject),
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
    } else {
      let url = Constants.UPDATE_EMPLOYEE + obj.addUserObject.UserName;
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(obj.addUserObject),
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
    handleClose();
  };

  let renderComponent = null;
  switch (currentComponent) {
    case "dashboard":
      renderComponent = (
        <Dashboard
          handleMenuClick={(menu) => handleMenuClick(menu)}
          handleSaveEmployee={(e) => handleSaveEmployee(e)}
          handleClose={handleClose}
          handleAddEmployee={handleAddEmployee}
          handleChangePassword={handleChangePassword}
          generatePass={generatePass}
          config={config}
          isGeneratePassOpen={values.isGeneratePassOpen}
          isAddEmployee={values.isAddEmployee}
          isChangePassword={values.isChangePassword}
        />
      );
      break;
    case "employees":
      renderComponent = (
        <Employees
          handleMenuClick={(menu) => handleMenuClick(menu)}
          handleSaveEmployee={(e) => handleSaveEmployee(e)}
          handleClose={handleClose}
          config={config}
        />
      );
      break;
    case "visitors":
      renderComponent = (
        <Visitors
          handleMenuClick={(menu) => handleMenuClick(menu)}
          handleClose={handleClose}
          config={config}
        />
      );
      break;
    default:
      renderComponent = (
        <Dashboard
          handleMenuClick={(menu) => handleMenuClick(menu)}
          handleClose={handleClose}
          handleSaveEmployee={(e) => handleSaveEmployee(e)}
          handleAddEmployee={handleAddEmployee}
          handleChangePassword={handleChangePassword}
          generatePass={generatePass}
          config={config}
          isGeneratePassOpen={values.isGeneratePassOpen}
          isAddEmployee={values.isAddEmployee}
          isChangePassword={values.isChangePassword}
        />
      );
      break;
  }
  return <div>{renderComponent}</div>;
};
export default HomePage;
