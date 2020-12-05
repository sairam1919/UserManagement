import React, { useState } from "react";
import Employees from "./dashboard/employees";
import Visitors from "./dashboard/visitors";
import Dashboard from "./dashboard/Dashboard";
import Constants from "../Constants";

const HomePage = (props) => {
  const [currentComponent, setCurrentComponent] = useState("dashboard");
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
        localStorage.setItem("config", JSON.stringify(data.result));
      } else {
        localStorage.setItem("config", {});
      }
    });
  const handleMenuClick = (option) => {
    setCurrentComponent(option);
  };
  let renderComponent = null;
  switch (currentComponent) {
    case "dashboard":
      renderComponent = (
        <Dashboard handleMenuClick={(menu) => handleMenuClick(menu)} />
      );
      break;
    case "employees":
      renderComponent = (
        <Employees handleMenuClick={(menu) => handleMenuClick(menu)} />
      );
      break;
    case "visitors":
      renderComponent = (
        <Visitors handleMenuClick={(menu) => handleMenuClick(menu)} />
      );
      break;
    default:
      renderComponent = (
        <Dashboard handleMenuClick={(menu) => handleMenuClick(menu)} />
      );
      break;
  }
  return <div>{renderComponent}</div>;
};
export default HomePage;
