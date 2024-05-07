import { useState, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
import "./LoginPage.css";
import image from "./images/photo-1539787200876-3c033a7bebcd.jpeg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectPassenger, setRedirectPassenger] = useState(false);
  const [redirectDriver, setRedirectDriver] = useState(false);
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const [failedLogin, setFailedLogin] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8082/Driver/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setFailedLogin("Invalid credentials");
          throw new Error("Failed to login as Driver");
        }
        setRedirectDriver(true);
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);

        sessionStorage.setItem("role", "driver");
        sessionStorage.setItem("roleId", data.id);
        sessionStorage.setItem("Phone number", data.phoneNumber);
        sessionStorage.setItem("Name", data.name);
        sessionStorage.setItem("available", data.available);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(`http://localhost:8085/Passenger/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setFailedLogin("Invalid credentials");
          throw new Error("Failed to login as passenger");
        }
        setRedirectPassenger(true);
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);

        // Using the decoded data
        sessionStorage.setItem("role", "passenger");
        sessionStorage.setItem("roleId", data.id);
        sessionStorage.setItem("Phone number", data.phoneNumber);
        sessionStorage.setItem("Name", data.name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(`http://localhost:8084/Admin/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          setFailedLogin("Invalid credentials");
          throw new Error("Failed to login");
        }
        setRedirectAdmin(true);
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);

        // Using the decoded data
        sessionStorage.setItem("role", "admin");
        sessionStorage.setItem("roleId", data.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (redirectPassenger) {
    return <Redirect to="/passengerrequestride" />; // put redirect page here on successful registration
  } else if (redirectDriver) {
    return <Redirect to="/driverchooseride" />; // put redirect page here on successful registration
  } else if (redirectAdmin) {
    return <Redirect to="/adminpage" />; // put redirect page here on successful registration
  }

  return (
    <div>
      <section className=" secondColor">
        <div className="container my-5">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col col-xl-10">
              <div className="card border rounded-3">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={image}
                      alt="login form"
                      className="img-fluid rounded-3"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body  p-lg-5 text-black">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-car-side fa-2x me-3 thirdColor"></i>
                          <span className="h1 fw-bold">Login</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">
                          Sign into your account
                        </h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        <p>
                          Don't have an account?{" "}
                          <Link to="/registermainpage">Register here</Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
