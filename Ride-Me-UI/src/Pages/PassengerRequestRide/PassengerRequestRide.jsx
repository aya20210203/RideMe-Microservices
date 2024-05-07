import { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import image from "./images/1.png";
import "./PassengerRequestRide.css";

function PassengerRequestRide() {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [price, setPrice] = useState(null);
  const [redirectPassenger, setRedirectPassenger] = useState(false);
  const [redirectDriver, setRedirectDriver] = useState(false);

  return (
    <div>
      <body>
        <div class="container p-5">
          <div class="row cardRequestRide">
            <div class="col-lg-6 sec-one-left">
              <h1>
                <i>
                  Go any where with <b>Ride Me</b>
                </i>
              </h1>
              <p>Request a ride, hop in, and go.</p>
              <form>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter destination"
                  name="destination"
                  required
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                />
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter price"
                  name="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div class="d-flex justify-content-around w-100">
                  <Link to="/passengerprofile" class="btn btnRegister m-2 ">
                    Back
                  </Link>

                  <Link
                    to={{
                      pathname: "/passengerchoosingdriver",
                      state: {
                        source: source,
                        dest: dest,
                        price: price,
                      },
                    }}
                    className="btn btnRegister m-2"
                  >
                    Search for drivers
                  </Link>
                </div>
              </form>
            </div>
            <div class="col-lg-6 border-0 rounded-4 sec-one-right d-flex align-items-center justify-content-center">
              <img src={image} alt="image" />
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default PassengerRequestRide;
