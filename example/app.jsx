import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Form, Navbar, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import DatePicker from '../src/index.jsx';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import createReactClass from 'create-react-class';
import Calendar from '../src/Calendar';

const spanishDayLabels = ['Dom', 'Lu', 'Ma', 'Mx', 'Ju', 'Vi', 'Sab'];
const spanishMonthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const wapperDivStyle = { border: '1px solid #ccc' };
const scrollingDivStyle = { padding: '10px', height: '70px', overflow: 'auto' };

const App = createReactClass({
  getInitialState() {
    return {
      date: new Date().toISOString(),
      previousDate: null,
      minDate: null,
      maxDate: null,
      focused: false,
      invalid: false
    };
  },
  handleChange(value) {
    this.setState({
      date: value
    });
  },
  handleMinChange(value) {
    this.setState({
      minDate: value
    });
  },
  handleMaxChange(value) {
    this.setState({
      maxDate: value
    });
  },
  handlePlacement() {
    return 'top';
  },
  handleRandomPlacement() {
    const placementKey = Math.floor((Math.random()*4) + 1);
    switch (placementKey) {
      case 1:
        return 'top';
      case 2:
        return 'left';
      case 4:
        return 'right';
      default:
        return 'bottom';
    }
  },
  handleValidationCheck(e) {
    e.preventDefault();
    this.setState(() => ({
      invalid: false
    }));
  },
  handleInvalidDate(e) {
    e.preventDefault();
    this.setState(() => ({
      invalid: true
    }));
  },
  handleResetValidation(e) {
    e.preventDefault();
    this.setState(() => ({
      invalid: false
    }));
  },
  render() {
    const LabelISOString = new Date().toISOString();
    return <Grid>
      <Row>
        <Col xs={12}>
          <h1>React-Bootstrap Date Picker</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Navbar>
            <Nav bsStyle="pills">
              <NavItem href="https://github.com/pushtell/react-bootstrap-date-picker/blob/master/example/app.jsx">Example Source</NavItem>
              <NavItem href="https://github.com/pushtell/react-bootstrap-date-picker">Documentation on Github</NavItem>
              <NavItem href="https://www.npmjs.com/package/react-bootstrap-date-picker">NPM Package</NavItem>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h2>Change Handler</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FormGroup controlId="change_handler">
            <ControlLabel>CALENDAR</ControlLabel>
            <Calendar selectedDate={'2018-05-04'} />
            <HelpBlock>Help</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
    </Grid>;
  }
});

const CustomControl = createReactClass({
  displayName: 'CustomControl',

  render() {
    const {
      value,
      placeholder,
      ...rest,
    } = this.props;

    return <Button {...rest}>{value || placeholder}</Button>;
  },
});

ReactDOM.render(<App />, document.getElementById('react'));
