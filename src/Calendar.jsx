import React from 'react';
import PropTypes from 'prop-types';

import addMonths from 'date-fns/add_months';
import subMonths from 'date-fns/sub_months';
import startOfWeek from 'date-fns/start_of_week'
import lastDayOfWeek from 'date-fns/last_day_of_week';
import endOfMonth from 'date-fns/end_of_month';
import eachDay from 'date-fns/each_day';
import format from 'date-fns/format';


const DAY_CLASS = 'calendar-day';
const DAY_DISABLED_CLASS = 'text-muted';
const DAY_SELECTED_CLASS = 'active';


class Calendar extends React.Component {

  static cloneWithoutTime(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  static cloneWithNewDay(date, day) {
    return new Date(date.getFullYear(), date.getMonth(), day);
  }

  static getMonthStartEndDates(date) {
    const monthFirstDate = Calendar.cloneWithNewDay(date, 1);
    const monthLastDate = endOfMonth(date);

    return {
      monthFirstDate: monthFirstDate,
      monthLastDate: monthLastDate,
      monthFirstWeedaykDate: startOfWeek(monthFirstDate),
      monthLastWeekdayDate: lastDayOfWeek(monthLastDate),
    };
  }

  constructor(props) {
    super(props);

    const defaultDate = Calendar.cloneWithoutTime(props.defaultDate);
    const {
      monthFirstDate,
      monthLastDate,
      monthFirstWeedaykDate,
      monthLastWeekdayDate,
    } = Calendar.getMonthStartEndDates(defaultDate);

    this.state = {
      defaultDate: defaultDate,
      selectedDate: defaultDate,
      monthFirstDate,
      monthLastDate,
      monthFirstWeedaykDate,
      monthLastWeekdayDate,
    }

    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleSelectDateKeyboard = this.handleSelectDateKeyboard.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  handleSelectDate(event) {
    event.preventDefault();

    const day = event.currentTarget.getAttribute('data-day');
    this.setState({ selectedDate: Calendar.cloneWithNewDay(this.state.monthFirstDate, day) });
  }

  handleSelectDateKeyboard(event) {
    if (event.key === 'Enter') {
      this.handleSelectDate(event);
    }
  }

  nextMonth() {
    const nextMonthDate = addMonths(this.state.monthFirstDate, 1);
    const monthStartEndDates = Calendar.getMonthStartEndDates(nextMonthDate);

    this.setState(monthStartEndDates);
  }

  prevMonth() {
    const prevMonthDate = subMonths(this.state.monthFirstDate, 1);
    const monthStartEndDates = Calendar.getMonthStartEndDates(prevMonthDate);

    this.setState(monthStartEndDates);
  }

  render() {
    const {
      selectedDate,
      monthFirstDate,
      monthLastDate,
      monthFirstWeedaykDate,
      monthLastWeekdayDate,
    } = this.state;

    const allDates = eachDay(monthFirstWeedaykDate, monthLastWeekdayDate);

    const rows = [];
    let columns = [];

    for (let i = 0; i < allDates.length; i++) {
      const date = allDates[i];
      const dayOfMonth = date.getDate();
      const key = columns.length + rows.length;

      let clickHandle;
      let classes = [DAY_CLASS];

      if (monthFirstDate > date) {
        clickHandle = this.prevMonth;
        classes.push(DAY_DISABLED_CLASS);
      } else if (monthLastDate < date) {
        clickHandle = this.nextMonth;
        classes.push(DAY_DISABLED_CLASS);
      } else if (date.getTime() === selectedDate.getTime()) {
        classes.push(DAY_SELECTED_CLASS);
      } else {
        clickHandle = this.handleSelectDate;
      }

      columns.push(<td
        className={classes.join(' ')}
        key={key}
        onClick={clickHandle}
        data-day={dayOfMonth}
        role="gridcell"
        tabIndex="0">
          {dayOfMonth}
        </td>
      );

      const isLastWeekday = columns.length == 7;
      if (isLastWeekday) {
        rows.push(<tr key={rows.length}>{columns}</tr>);
        columns = [];
      }
    }

    const headerRows = [];
    for (let i = 0; i < 7; i++) {
      headerRows.push(<th
        className="calendar-header-weekday"
        key={i}
        role="columnheader"
        scope="col">
          {format(allDates[i], 'ddd')}
        </th>)
    }

    return (
      <div className="calendar">
        <table role="grid">
          <thead>
            <tr>
              <th className="calendar-button-prev" role="gridcell" tabIndex="0" onClick={this.prevMonth}></th>
              <th className="calendar-header-text" colSpan="5">{format(monthFirstDate, 'MMMM YYYY')}</th>
              <th className="calendar-button-next" role="gridcell" tabIndex="0" onClick={this.nextMonth}></th>
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
  defaultDate: PropTypes.instanceOf(Date).isRequired,
};

Calendar.defaultProps = {
  defaultDate: new Date(),
};

export default Calendar;
