import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Calendar from '../src/Calendar';


class App extends React.Component {

  render() {
    const LabelISOString = new Date().toISOString();
    return (
      <div>
        <Calendar defaultDate={moment('2018-05-04', 'YYYY-MM-DD')} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
