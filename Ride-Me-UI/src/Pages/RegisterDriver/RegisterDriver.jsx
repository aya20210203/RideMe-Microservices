import { useState, useEffect, useReducer } from "react";
import { Link, Redirect } from "react-router-dom";
import "./RegisterDriver.css";

const RegisterDriver = () => {
  const [cities, setCities] = useState(null);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [carType, setCarType] = useState("");
  const [smoking, setSmoking] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [region, setRegion] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8082/Driver/get-cities")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCities(data);
      });
  }, [_]);

  // useEffect(() => {
  //     console.log(smoking);
  // }, [smoking]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    fetch(`http://localhost:8082/Driver/add-driver`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        carType: carType,
        smoking: smoking,
        cityId: cityId,
        region: region,
      }),
    }).then((res) => {
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
    return <Redirect to="/checkforapprove" />; // redirect page here on successful registration
  }

  return (
    <div className="mainDiv my-5">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className=" col-md-9  col-xl-6">
            <div className="card">
              <h2 className="text-center mb-5">Driver Registeration</h2>

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
                    Car Type
                  </label>
                  <input
                    type="text"
                    name="car"
                    id="car"
                    className="form-control form-control-lg"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                  />
                </div>

                <div className="d-flex mb-4 row">
                  <label className="form-label" for="">
                    Are you a Smoker ?
                  </label>
                  <div className="d-flex">
                    <div class="form-check d-flex flex-row align-items-center mx-4 ">
                      <input
                        class="form-check-input me-2 border border-1 border-black"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={() => setSmoking(true)}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        YES
                      </label>
                    </div>
                    <div class="form-check d-flex flex-row align-items-center">
                      <input
                        class="form-check-input me-2 border border-1 border-black"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={() => setSmoking(false)}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        NO
                      </label>
                    </div>
                  </div>
                </div>

                <div class=" mb-4">
                  <label className="form-label" for="">
                    City
                  </label>
                  <select
                    data-mdb-select-init
                    className="form-select form-control p-2"
                    onChange={(e) => setCityId(e.target.value - 1)}
                  >
                    <option value="1" disabled selected>
                      Select City
                    </option>
                    {cities &&
                      cities.map((city) => (
                        <option key={city.id} value={city.id + 1}>
                          {city.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" for="">
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    className="form-control form-control-lg"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
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

                <div className="d-flex align-items-center justify-content-around">
                  <Link to="registermainpage" class="btn btnRegister m-4 ">
                    Back
                  </Link>

                  <button class="btn btnRegister m-2" type="submit">
                      Register
                  </button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">
                  Already have an account?{" "}
                  <a href="#!" className="fw-bold text-body">
                    <u>Login here</u>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDriver;
