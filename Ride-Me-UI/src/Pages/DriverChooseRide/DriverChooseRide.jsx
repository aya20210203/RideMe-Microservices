import { useState, useEffect, useReducer } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const DriverChooseRide = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const [redirectCurrentRide, setRedirectCurrentRide] = useState(false);

  const [available, setAvailable] = useState(
    sessionStorage.getItem("available")
  );

  const [requests, setRequests] = useState();

  useEffect(() => {
    let interval;
    const pollRideRequest = () => {
      fetch(
        `http://localhost:8080/Rides/get-requested-rides?driverId=${Number(
          sessionStorage.getItem("roleId")
        )}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setRequests(data);
        });
    };
    interval = setInterval(pollRideRequest, 5000);
    return () => clearInterval(interval);
  }, [_]);
  const reqAcceptNotification = () => {
    toast.success("Request Accepted: Redirecting...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const reqRejectNotification = () => {
    toast.info("Request rejected", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleAcceptRequest = (
    rideId,
    rideSource,
    rideDest,
    ridePrice,
    passengerName,
    passengerNumber
  ) => {
    fetch(`http://localhost:8080/Rides/accept-ride?rideId=${rideId}`, {
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          console.log("Ride request accepted");
          reqAcceptNotification();
          sessionStorage.setItem("currentRideSource", rideSource);
          sessionStorage.setItem("currentRideDest", rideDest);
          sessionStorage.setItem("currentRidePrice", ridePrice);
          sessionStorage.setItem("passengerName", passengerName);
          sessionStorage.setItem("passengerNumber", passengerNumber);
          setTimeout(() => {
            setRedirectCurrentRide(true);
          }, 4000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      `http://localhost:8082/Driver/not-available?id=${Number(
        sessionStorage.getItem("roleId")
      )}`,
      {
        method: "PUT",
      }
    )
      .then((res) => {
        if (res.ok) {
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReject = (rideId) => {
    fetch(`http://localhost:8080/Rides/reject-ride?rideId=${rideId}`, {
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          console.log("Ride request rejected");
          reqRejectNotification();
          forceUpdate();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSetAvailable = () => {
    fetch(
      `http://localhost:8082/Driver/available?id=${Number(
        sessionStorage.getItem("roleId")
      )}`,
      {
        method: "PUT",
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Set to Available");
          setAvailable(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSetNotAvailable = () => {
    fetch(
      `http://localhost:8082/Driver/not-available?id=${Number(
        sessionStorage.getItem("roleId")
      )}`,
      {
        method: "PUT",
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Set to Not Available");
          setAvailable(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (redirectCurrentRide) {
    return <Redirect to="/drivercurrentride" />;
  }

  return (
    <div>
      <div className="container cardDriverChooseRide my-5">
        <div>
          <div className="availbaility buttons row d-flex justify-content-center text-center gap-2">
            <div
              className={`mb-1 h4 ${
                available ? "text-success" : "text-danger"
              }`}
            >
              Current Availability: {available ? "Available" : "Not Available"}
            </div>
            <button
              className="col-2 btn btn-primary"
              onClick={handleSetAvailable}
            >
              Available for rides
            </button>
            <button
              className="col-2 btn btn-secondary"
              onClick={handleSetNotAvailable}
            >
              Not Available
            </button>
          </div>
          <h2 className="fw-bold">Passenger Requests</h2>
          <div className="table-responsive">
            <table class="table table-hover text-center ">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Request</th>
                  <th scope="col">Passenger Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests.map((request) => {
                    return (
                      <tr>
                        <td>{request.id}</td>
                        <td>{request.passengerName}</td>
                        <td>{request.passengerNumber}</td>
                        <td>{request.source}</td>
                        <td>{request.destination}</td>
                        <td>{request.price}</td>
                        <td>
                          <button
                            className="btn btn-success me-2 fw-semibold"
                            onClick={() =>
                              handleAcceptRequest(
                                request.id,
                                request.source,
                                request.destination,
                                request.price,
                                request.passengerName,
                                request.passengerNumber
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger ms-2 fw-semibold"
                            onClick={() => handleReject(request.id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div>
            <Link to="passengerprofile" class="btn btnRideHistory m-4 ">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverChooseRide;
