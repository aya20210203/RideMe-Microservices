import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import "./PassengerRideHistory.css";

const PassengerRideHistory = () => {
  const [rides, setRides] = useState();

  useEffect(() => {
    fetch(
      `http://localhost:8081/Rides/get-passenger-ride-history?PassengerId=${sessionStorage.getItem(
        "roleId"
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRides(data);
      });
  }, []);

  return (
    <div>
      <div className="container cardRideHistory my-5">
        <div>
          <h2 className="fw-bold">Rides History</h2>
          <div className="table-responsive">
            <table class="table table-striped table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Ride Id</th>
                  <th scope="col">Driver Name</th>
                  <th scope="col">Driver Phone number</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Status</th>
                  <th scope="col">Price</th>
                  <th scope="col">Rating</th>
                  <th scope="col">FeedBack</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {rides &&
                  rides.map((ride) => {
                    return (
                      <tr key={ride.RideId}>
                        <th scope="row">{ride.RideId}</th>
                        <td>{ride.Driver}</td>
                        <td>{ride.DriverPhoneNumber}</td>
                        <td>{ride.Source}</td>
                        <td>{ride.Destination}</td>
                        <td>{ride.Status}</td>
                        <td>{ride.Price}</td>
                        <td>{ride.Rating !== -1.0 ? ride.Rating : "None"}</td>
                        <td>{ride.Feedback}</td>
                        <td>{ride.Date}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <Link to="passengerprofile" class="btn btnRegister m-4 ">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerRideHistory;
