import React from 'react';

class BackButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    handleBackButton() {
        console.log("Inside the BackButton method");
        this.props.handleBackbutton();
    }

    render() {
        return (
            <div className = "backbutton-div">
                <span className = "backbutton" onClick = {() => this.handleBackButton}>Dashboard</span>
            </div>
        )
    }
}
export default BackButton; 