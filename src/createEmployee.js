import React from 'react';
import Backbutton from './Backbutton.jsx';

class CreateEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        this.handleBackbutton = this.handleBackbutton.bind(this);
    }
    handleBackbutton(){
        console.log("Inside the BackButton method");
        this.props.handleBackbutton();
    }

    render() {
        return (
            <div>
                <Backbutton handleBackbutton = {this.handleBackbutton}
                />
               CreateEmployee
            </div>
        )
    }
}
export default CreateEmployee; 