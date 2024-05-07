import { useState, useEffect, useReducer } from "react";
import format from "date-fns/format";
import "./PickDayMonth.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PickDayMonth() {
  const [date, setDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);

  const [showMonth, setShowMonth] = useState(true);

  const [Income, setIncome] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    setShowDate(true);
    setShowMonth(false);
  };

  // special code for showing only months ----------->
  const [month, setMonth] = useState(new Date());

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`;

    return <span title={tooltipText}>{shortMonth}</span>;
  };

  const handleMonthChange = (date) => {
    setMonth(date);
    setShowDate(false);
    setShowMonth(true);
  };
  // end of month code ----------->

  useEffect(() => {
    fetch(`http://localhost:8080/Rides/get-driver-daily-income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driverId: sessionStorage.getItem("roleId"),
        dateString: format(date, "yyyy-MM-dd"),
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Successeful call to calculate day income");
          return res.text();
        }
      })
      .then((data) => {
        setIncome(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [date]);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch(`http://localhost:8080/Rides/get-driver-monthly-income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driverId: sessionStorage.getItem("roleId"),
        month: format(month, "M"),
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Successeful call to calculate monthly income");
          return res.text();
        }
      })
      .then((data) => {
        setIncome(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [month, _]);


  return (
    <div className="container-sm rounded border border-3 shadow my-4 py-3">
      <div className="row justify-content-center">
        {/* <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary">Calculate total income by Day</button>
          <button type="button" class="btn btn-secondary">Calculate total income by Month</button>
        </div> */}

        <div className="row gap-5 align-items-center justify-content-center">
          <h2 className="display-4 text-center fw-bold">
            Calculate total income
          </h2>

          <div className="col-4">
            <div className="row">
              <button type="button" className="btn btn-outline-primary">
                Calculate total income by Day
              </button>
            </div>
            <div className="row align-items-center justify-content-center">
              <DatePicker
                showIcon
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd-MM-YYYY"
                inline
              />
            </div>
          </div>

          <div className="col-4">
            <div className="row">
              <button type="button" className="btn btn-outline-primary">
                Calculate total income by Month
              </button>
            </div>
            <div className="row align-items-center justify-content-center">
              <DatePicker
                showIcon
                selected={month}
                onChange={handleMonthChange}
                renderMonthContent={renderMonthContent}
                showMonthYearPicker
                dateFormat="MM-yyyy"
                inline
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <p className=" display-6 text-center">
            Total income for {showDate && date && format(date, "yyyy-MM-dd")}
            {showMonth && month && format(month, "MMMM yyyy")} is:
          </p>

          <p className="lead display-4 text-center fw-bold">
            {Income}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PickDayMonth;
