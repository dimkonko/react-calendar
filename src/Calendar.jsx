import React, { PropTypes } from 'react';
import moment from 'moment';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    const defaultDate = moment(props.selectedDate, 'YYYY-MM-DD');
    this.state = {
      defaultDate: defaultDate,
      monthStartDate: moment(defaultDate).startOf('month'),
      selectedDate: undefined,
    }

    this.selectDate = this.selectDate.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  selectDate(event) {
    const day = event.currentTarget.getAttribute('data-day');
    this.setState({ selectedDate: moment(this.state.monthStartDate).set('date', day) });
  }

  nextMonth() {
    this.setState({ monthStartDate: this.state.monthStartDate.add(1, 'month') });
  }

  prevMonth() {
      this.setState({ monthStartDate: this.state.monthStartDate.subtract(1, 'month') });
  }

  render() {
    const selectedDate = this.state.selectedDate || this.state.defaultDate;

    const startDate = this.state.monthStartDate;
    const endDate = moment(startDate).endOf('month');

    const pageStartDate = moment(startDate).subtract(startDate.weekday(), 'days');
    const pageEndDate = moment(endDate).add(7 - endDate.weekday(), 'days');

    console.log('selected: ', selectedDate.format('L'));
    console.log('start ', startDate.format('L'));
    console.log('end ', endDate.format('L'));
    console.log('page start ', pageStartDate.format('L'));
    console.log('page end ', pageEndDate.format('L'));

    const currentMonth = startDate.month();
    const rows = [];
    let columns = [];

    let d = pageStartDate.clone();
    while (d.isSameOrBefore(pageEndDate)) {
      const day = d.date();
      const isoWeekday = d.isoWeekday();
      const key = columns.length + rows.length;

      let className = 'day';
      let clickHandle = this.selectDate;

      if (currentMonth != d.month()) {
        columns.push(<td key={key}></td>);
      } else {
        if (d.isSame(selectedDate)) {
          className += ' active';
          clickHandle = undefined;
        }
        if (isoWeekday == 6 || isoWeekday == 7) {
          className += ' text-muted';
          clickHandle = undefined;
        }

        columns.push(<td className={className} key={key} data-day={day} onClick={clickHandle}>{day}</td>);
      }

      if (d.weekday() == 6) {
        rows.push(<tr key={rows.length}>{columns}</tr>);
        columns = [];
      }
      d.add(1, 'days')
    }

    const headerRows = [];
    const weekdayNames = moment.weekdaysShort(true);
    for (let i = 0; i < 7; i++) {
      headerRows.push(<th key={i}>{weekdayNames[i]}</th>)
    }

    console.log(rows);

    return (
      <div className="datepicker">
        <table>
          <thead>
            {/*
            <tr>
              <th onClick={this.prevMonth}><i className="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>
              <th colSpan="5">{m.get('month')+1} / {m.get('year')}</th>
              <th onClick={this.nextMonth}><i className="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>
            </tr>
            */}
            <tr>
              <th className="controll-button" onClick={this.prevMonth}>«</th>
              <th className="datepicker-switch" colSpan="5">{startDate.format('MMMM YYYY')}</th>
              <th className="controll-button" onClick={this.nextMonth}>»</th>
            </tr>
            <tr>
              {headerRows}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
