import React, { Component } from 'react';
import '../styles/App.css';
import eventData from '../data/eventData.json'

import Day from './Day';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Day eventData={eventData} />
      </div>
    );
  }
}

export default App;
