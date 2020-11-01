import React from 'react';
import './App.css';
import NameForm from './Login';
import { render } from 'enzyme';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         
      };
  }

  render() {
  return (
    <div className="App" >

     <NameForm></NameForm>
    </div>
  );
}
}

export default App;
