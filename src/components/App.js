import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [editYear, setEditYear] = useState(false);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDay = (month, year) =>
    new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDay(month, year);
    const rows = [];
    let cells = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(<td key={day}>{day}</td>);

      if ((cells.length) % 7 === 0) {
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    if (cells.length > 0) {
      rows.push(<tr key="last">{cells}</tr>);
    }

    return rows;
  };

  return (
    <div id="main">
      <h1 id="calendar-heading">Calendar</h1>

      {/* Month Dropdown */}
      <select
        id="month-select"
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value))}
      >
        {months.map((m, index) => (
          <option key={index} value={index}>
            {m}
          </option>
        ))}
      </select>

      {/* Year Display / Edit */}
      {!editYear ? (
        <span
          id="year-display"
          onDoubleClick={() => setEditYear(true)}
        >
          {year}
        </span>
      ) : (
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          onBlur={() => setEditYear(false)}
          autoFocus
        />
      )}

      <hr />

      {/* Calendar Table */}
      <table id="calendar-table" border="1">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>

      <hr />

      {/* Navigation Buttons */}
      <button
        id="prev-year"
        onClick={() => setYear(year - 1)}
      >
        &lt;&lt;
      </button>

      <button
        id="prev-month"
        onClick={() =>
          month === 0
            ? (setMonth(11), setYear(year - 1))
            : setMonth(month - 1)
        }
      >
        &lt;
      </button>

      <button
        id="next-month"
        onClick={() =>
          month === 11
            ? (setMonth(0), setYear(year + 1))
            : setMonth(month + 1)
        }
      >
        &gt;
      </button>

      <button
        id="next-year"
        onClick={() => setYear(year + 1)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default App;
