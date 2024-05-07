import React from "react";
import { useState, useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import "./FeedBack.css";
import { ToastContainer, toast } from "react-toastify";

function FeedBack() {
  const history = useHistory();
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState(null);

  //   useEffect(() => {
  //     console.log(feedback);
  //   }, [feedback]);

  const notificationRedirect = () => {
    toast.success("Feedback submitted", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    toast.info("Redirecting to ride history...", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      history.push("/passengerridehistory");
    }, 3000);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
  
    const url = new URL("http://localhost:8081/Rides/rate");
    url.searchParams.append("id", Number(sessionStorage.getItem("currentRideId")));
    url.searchParams.append("rate", rating);
  
    fetch(url.toString(), {
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          // console.log("rating sent");
          // notificationRedirect();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  const handleDriverRatingSubmit = (e) => {
    e.preventDefault();

    const url = new URL("http://localhost:8081/Rides/calculate-driver-avg-rating");
    url.searchParams.append("DriverId", Number(sessionStorage.getItem("currentRideDriverId")));
    fetch(url.toString(), {
      method: "POST",
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(new Error("Request failed with status: " + res.status));
        }
    })
    .then((data) => {
        const url2 = new URL("http://localhost:8083/Driver/change-driver-avg-rating");
        url2.searchParams.append("id", Number(sessionStorage.getItem("currentRideDriverId")));
        url2.searchParams.append("rate", data);
        fetch(url2.toString(), {
          method: "PUT",
        })
          .then((res) => {
            if (res.ok) {
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        })
    .catch((error) => {
        console.error("Error:", error);
    });
  }
  
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const url = new URL("http://localhost:8081/Rides/feedback");
    url.searchParams.append("id", Number(sessionStorage.getItem("currentRideId")));
    url.searchParams.append("feedback", feedback);
  
    fetch(url.toString(), {
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          console.log("feedback sent");
          notificationRedirect();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div>
        <div className="container mt-5 mb-5">
          <div className="cardFeedBack">
            <h2 className="fw-bold">Ride FeedBack</h2>
            <div className="">
              <div className=" Ride-Details form-group w-100">
                <div className="h5 col-sm-12 w-100">
                  <label for="source">Driver Name:</label>
                  <div className=" col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      value={sessionStorage.getItem("currentRideDriverName")}
                      readonly
                    />
                  </div>
                </div>

                <div className="h5 col-sm-12 w-100">
                  <label for="source">Source:</label>
                  <div className=" col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      value={sessionStorage.getItem("currentRideSource")}
                      readonly
                    />
                  </div>
                </div>
                <div className="h5 col-sm-12 w-100">
                  <label for="destination">Destination:</label>
                  <div className=" col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      value={sessionStorage.getItem("currentRideDestination")}
                      readonly
                    />
                  </div>
                </div>
                <div className="h5 col-sm-12 w-25 ">
                  <label for="destination">Price:</label>
                  <div className=" col-lg-12">
                    <input
                      type="text"
                      className="form-control"
                      id="Price"
                      value={sessionStorage.getItem("currentRidePrice")}
                      readonly
                    />
                  </div>
                </div>
              </div>

              <form class="was-validated">
                <div class="mb-3 text-area-field">
                  <label for="validationTextarea" class="form-label fw-bold">
                    Please tell us your Feedback about the Ride and if there is
                    any comments on the driver
                  </label>
                  <textarea
                    class="form-control"
                    id="validationTextarea"
                    placeholder="Your Comment"
                    required
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                  <div class="invalid-feedback">
                    Your message is required !!
                  </div>
                </div>

                <div class="mb-3">
                  <label for="ratingForm" class="form-label fw-bold">
                    Rating for the ride:
                  </label>
                  <select
                    class="form-select"
                    required
                    aria-label="select example"
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <div class="invalid-feedback">Rating is required</div>
                </div>

                <div className=" mb-3 d-flex justify-content-around">
                  <div class="">
                    <button
                      class="btn btnRegister m-2"
                      onClick={(e) => {
                        handleRatingSubmit(e);
                        handleDriverRatingSubmit(e);
                        handleFeedbackSubmit(e);
                    }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeedBack;
