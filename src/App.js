import React, { Component } from 'react';
import './App.css';
import Main from './components/Main/Main';

class App extends Component {

componentDidMount(){
  document.title = 'Task Country'
}

  render() {
    return (
      <div className="App">
       <Main />
      </div>
    );
  }
}

export default App;
