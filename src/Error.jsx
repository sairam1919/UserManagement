import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Error">
        <span>{this.props.errorMessage}</span>
      </div>
    );
  }
}

export default Error;
