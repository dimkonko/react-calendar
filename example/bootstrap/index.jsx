import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Overlay, Popover, Button } from 'react-bootstrap';
import Calendar from '../../src/Calendar';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = e => {
      this.setState({ target: e.target, show: !this.state.show });
    };

    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Holy guacamole!</Button>

        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="bottom"
          container={document.body}
          containerPadding={20}
          rootClose={true}
        >
          <Popover id="popover-contained">
            <Calendar defaultDate={new Date('2018-05-04')} />
          </Popover>
        </Overlay>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
