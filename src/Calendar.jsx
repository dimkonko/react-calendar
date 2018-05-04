import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const DAY_CLASS = 'day';
const DAY_DISABLED_CLASS = 'text-muted';
const DAY_SELECTED_CLASS = 'active';

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    const defaultDate = moment(props.defaultDate);
    console.log(defaultDate.format('L'));
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

    const monthStartDate = moment(this.state.monthStartDate);
    const monthEndDate = moment(monthStartDate).endOf('month');

    const pageStartDate = moment(monthStartDate).subtract(monthStartDate.weekday(), 'days');
    const pageEndDate = moment(monthEndDate).add(7 - monthEndDate.weekday(), 'days');

    const currentMonth = monthStartDate.month();
    const rows = [];
    let columns = [];

    const d = pageStartDate.clone();
    while (d.isSameOrBefore(pageEndDate)) {
      const dayOfMonth = d.date();
      const isoWeekday = d.isoWeekday();

      const key = columns.length + rows.length;

      let clickHandle;
      let classes = [DAY_CLASS];

      if (d.isBefore(monthStartDate)) {
        clickHandle = this.prevMonth;
        classes.push(DAY_DISABLED_CLASS);
      } else if (d.isAfter(monthEndDate)) {
        clickHandle = this.nextMonth;
        classes.push(DAY_DISABLED_CLASS);
      } else {
        clickHandle = this.selectDate;
      }

      if (d.isSame(selectedDate)) {
        classes.push(DAY_SELECTED_CLASS);
        clickHandle = undefined;
      }

      columns.push(<td
        className={classes.join(' ')}
        key={key}
        data-day={dayOfMonth}
        onClick={clickHandle}>
          {dayOfMonth}
        </td>
      );

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

    return (
      <div className="datepicker">
        <table>
          <thead>
            <tr>
              <th className="controll-button prev" onClick={this.prevMonth}></th>
              <th className="datepicker-switch" colSpan="5">{monthStartDate.format('MMMM YYYY')}</th>
              <th className="controll-button next" onClick={this.nextMonth}></th>
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

Calendar.propTypes = {
  defaultDate: PropTypes.object.isRequired,
}

Calendar.defaultProps = {
  defaultDate: moment(),
}

export default Calendar;
