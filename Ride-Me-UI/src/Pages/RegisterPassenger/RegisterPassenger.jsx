import { useState, useEffect, useReducer } from "react";
import { Link, Redirect } from "react-router-dom";
import "./RegisterPassenger.css";

const RegisterPassenger = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    fetch(`http://localhost:8085/Passenger/add-passenger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log("Passenger Added to the database");
        if (res.ok) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (redirect) {
    return <Redirect to="/checkforapprove" />; // put redirect page here on successful registration
  }

  return (
    <div>
      <div className="mainDiv my-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className=" col-md-9  col-xl-6">
              <div className="card">
                <h2 className="text-center mb-5">Passenger Registeration</h2>

                <form onSubmit={(e) => handleSubmit(e)}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="">
                      User Name
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="">
                      Email
                    </label>
                    <input
                      type="email"
                      id=""
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-control form-control-lg"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="">
                      Password
                    </label>
                    <input
                      type="password"
                      id=""
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2 border border-1 border-black"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" for="">
                      I agree all statements in{" "}
                      <a href="#!" className="text-body">
                        <u>Terms of service</u>
                      </a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button className="btn">
                      <Link to="registermainpage" class="btn btnRegister m-2 ">
                        Back
                      </Link>
                    </button>

                    {/* instead of using <Link> I used <Redirect> component
                        that checks the status of redirect variable at the start of the page
                    */}

                    <button type="submit" className="btn">
                      Register
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    Already have an account?{" "}
                    <Link to="/loginpage" className="fw-bold text-body">
                      <>Login here</>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPassenger;
