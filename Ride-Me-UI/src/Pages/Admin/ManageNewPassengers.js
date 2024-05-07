import { useState, useEffect, useReducer } from "react";

function ManageNewPassengers() {
  const [passengers, setPassengers] = useState(null);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fetch("http://localhost:8085/Passenger/get-waiting-passengers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPassengers(data);
      });
  }, [_]);

  const handleAccept = (id) => {
    fetch(`http://localhost:8085/Passenger/accept-passenger?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {}
    }).then(() => {
      console.log("User Accepted")
      forceUpdate()
    })
  }

  const handleReject = (id) => {
    fetch(`http://localhost:8085/Passenger/reject-passenger?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {}
    }).then(() => {
      console.log("User Rejected")
      forceUpdate()
    })
  }
  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center my-4">Manage New Passengers</h1>
      <table className="table table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {passengers &&
            passengers.map((passenger) => {
              return (
                <tr key={passenger.id}>
                  <th scope="row">{passenger.name}</th>
                  <td>{passenger.email}</td>
                  <td>{passenger.phoneNumber}</td>
                  <td>
                    <div className="row justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-success col-3 fw-semibold"
                        onClick={() => handleAccept(passenger.id)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger col-3 fw-semibold"
                        onClick={() => handleReject(passenger.id)}
                      >
                        Reject
                      </button>
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

export default ManageNewPassengers;
