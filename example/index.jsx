import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from '../src/Calendar';


class App extends React.Component {

  render() {
    const LabelISOString = new Date().toISOString();
    return (
      <div>
        <Calendar defaultDate={new Date('2018-05-04')} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
