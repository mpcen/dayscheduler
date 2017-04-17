import React, { Component } from 'react';
import eventData from '../data/eventData.json'

import Day from './Day';

class App extends Component {
  render() {
    return (
      <div>
      	<Day eventData={eventData} />
      </div>
    );
  }
}

export default App;
