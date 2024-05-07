import { useState, useEffect, useReducer } from "react";

function AdminShowRides() {
  const [rides, setRides] = useState(null);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("http://localhost:8081/Rides/get-all-rides", { headers })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRides(data);
      });
  }, [_]);

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center my-4">Rides Results</h1>
      <table className="table table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Driver Name</th>
            <th scope="col">Passenger Name</th>
            <th scope="col">Source</th>
            <th scope="col">Destination</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Feedback</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {rides &&
            rides.map((ride) => {
              return (
                <tr key={ride.RideId}>
                  <th scope="row">{ride.DriverName}</th>
                  <td>{ride.PassengerName}</td>
                  <td>{ride.RideSource}</td>
                  <td>{ride.RideDestination}</td>
                  <td>{ride.Price}</td>
                  <td>{ride.Rating !== -1? ride.Rating: "None"}</td>
                  <td>{ride.Feedback}</td>
                  <td className="px-5">
                    <div className="row justify-content-center gap-3">
                      {ride.Status === "completed" && (
                          <button
                            type="button"
                            className="btn btn-success col fw-semibold"
                          >
                            Completed
                          </button>
                        )}
                      {ride.Status === "not completed" && (
                          <button
                            type="button"
                            className="btn btn-warning col fw-semibold"
                          >
                            Not Completed
                          </button>
                        )}
                        {ride.Status === "requested" && (
                          <button
                            type="button"
                            className="btn btn-info col fw-semibold"
                          >
                            Requested
                          </button>
                        )}
                        {ride.Status === "rejected" && (
                          <button
                            type="button"
                            className="btn btn-danger col fw-semibold"
                          >
                            Rejected
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminShowRides;
