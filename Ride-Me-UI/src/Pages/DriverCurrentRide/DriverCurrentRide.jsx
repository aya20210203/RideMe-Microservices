import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

const DriverCurrentRide = () => {
  const history = useHistory();
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const [currentRideInfo, setCurrentRideInfo] = useState(null);
  const [rideStatus, setRideStatus] = useState(null);
  const [currentRideId, setCurrentRideId] = useState();

  // send a toast notification if payment is confirmed
  const confirmPaymentNotification = () => {
    toast.success("Payment Confirmed", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    toast.success("Ride Completed", {
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:8080/Rides/get-current-ride-status-driver?driverId=${Number(sessionStorage.getItem("roleId"))}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data = data[data.length - 1];
        console.log(data);
        setCurrentRideInfo(data);
        console.log(data);
        setRideStatus(data.statusId === "4" ? true : false);
        setCurrentRideId(data.id);
      });
  }, []);

  useEffect(() => {
    let interval;
    const pollRideStatus = () => {
      console.log(currentRideId);
      fetch(
        `http://localhost:8080/Rides/get-ride-status?rideId=${currentRideId}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.name === "completed") {
            setRideStatus(true);
            clearInterval(interval);
          }
        })
        .catch((error) => {
          console.error("Error polling ride status:", error);
          clearInterval(interval);
        });
    };

    // Start polling immediately and then repeat every 5 seconds
    interval = setInterval(pollRideStatus, 5000);

    return () => clearInterval(interval); // Cleanup function to clear interval on unmount or when ride status changes
  }, [currentRideId]);

  rideStatus && confirmPaymentNotification(); // Notifications go brr

  const handleGoToRequests = () => {
    history.push("/driverchooseride");
  };

  const handleGoToIncome = () => {
    history.push("/pickdaymonth");
  };

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="card-druing-ride mt-5">
          <div className="row">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h2 className="fw-bold">Current Ride Information</h2>
              <div className="form-group row w-100">
                <div className="col-12">
                  <label className="h4" for="source">
                    Passenger Name
                  </label>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="passengerName"
                      value={currentRideInfo && currentRideInfo.passengerName} // info from api here
                      readonly
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="h4" for="source">
                    Source
                  </label>
                  <div className=" col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      value={currentRideInfo && currentRideInfo.source}
                      readonly
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="h4" for="destination">
                    Destination
                  </label>
                  <div className=" col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      value={currentRideInfo && currentRideInfo.destination}
                      readonly
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="h4" for="price">
                    Price
                  </label>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      value={currentRideInfo && currentRideInfo.price} // info from api here
                      readonly
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="h4" for="price">
                    Passenger phone number
                  </label>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={currentRideInfo && currentRideInfo.passengerNumber} // info from api here
                      readonly
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="h4" for="price">
                    Ride Status
                  </label>
                  <div className="col-lg-12 ">
                    <input
                      type="text"
                      className={`form-control ${
                        rideStatus ? "bg-success" : "bg-primary"
                      } text-light`}
                      id="rideStatus"
                      value={rideStatus ? "completed" : "not completed"} // info from api here
                      readonly
                    />
                  </div>
                </div>
                {rideStatus && (
                  <div className="row ms-1 justify-content-center gap-5">
                    <button
                      className="btn btn-primary col-4 py-2 fs-5 fw-bold"
                      onClick={handleGoToRequests}
                    >
                      Go to ride requests page
                    </button>
                    <button
                      className="btn btn-primary col-4 py-2 fs-5 fw-bold"
                      onClick={handleGoToIncome}
                    >
                      Go to calculating income page
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCurrentRide;
