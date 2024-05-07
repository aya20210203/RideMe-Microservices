import { useState, useEffect } from "react";

function ManageNewDrivers() {
  const [drivers, setDrivers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8083/Driver/get-waiting-drivers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDrivers(data);
      });
  }, []);

  const handleAccept = (id) => {
    fetch(`http://localhost:8083/Driver/accept-driver?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {}
    }).then(() => {
      console.log("User Accepted")
      setDrivers(prevPassengers => prevPassengers.filter(passenger => passenger.id !== id));
    })
  }

  const handleReject = (id) => {
    fetch(`http://localhost:8083/Driver/reject-driver?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {}
    }).then(() => {
      console.log("User Rejected")
      setDrivers(prevPassengers => prevPassengers.filter(passenger => passenger.id !== id));
    })
  }
  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center my-4">Manage New Drivers</h1>
      <table className="table table-hover table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Car Type</th>
            <th scope="col">Smoking</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers &&
            drivers.map((drivers) => {
              return (
                <tr key={drivers.Id}>
                  <th scope="row">{drivers.Name}</th>
                  <td>{drivers.Email}</td>
                  <td>{drivers.PhoneNumber}</td>
                  <td>{drivers.CarType}</td>
                  <td>{drivers.IsSmoking? "Yes" : "No"}</td>
                  <td>
                    <div className="row justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-success col-3 fw-semibold"
                        onClick={() => handleAccept(drivers.Id)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger col-3 fw-semibold"
                        onClick={() => handleReject(drivers.Id)}
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

export default ManageNewDrivers;
