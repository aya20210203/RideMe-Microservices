import { Link } from 'react-router-dom';
import './IntroPage.css'
import imagePassenger from './images/photo-1539787200876-3c033a7bebcd.jpeg';

const IntroPage = () => {
    return (
        <div>
            <section className=" secondColor" >
                <div className="container my-3">
                    <div className="row d-flex justify-content-center align-items-center ">
                        <div className="col col-xl-10">


                            <div className="card border rounded-3">
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={imagePassenger} alt="login form" className="img-fluid rounded-3" />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center cardIntroPage">
                                        <div className="card-body  p-lg-5 text-black">

                                            <form>
                                                <div className="d-flex align-items-center">

                                                    <span className="h1 fw-bold">Go anywhere with <br /><i><b>Ride Me</b></i> <i className="fas fa-car-side fa-1x me-3 thirdColor" ></i></span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" >Order a ride with <b>RideMe</b>, and go further, faster.</h5>
                                                {/* <div data-mdb-input-init className="form-outline mb-4">
                                                    <input class="form-check-input m-2" type="radio" value="" name="flexRadioDefault" id="flexRadioDefault2" />
                                                    <label class="form-check-label fw-bold fs-4" for="flexRadioDefault2">
                                                        Passenger
                                                    </label>
                                                </div> */}

                                                <div className="">
                                                    <p>Don't have an Account ? <Link to='/registermainpage'>Register</Link></p>
                                                    <p>Already have an Account : <Link to='/loginpage'>Login</Link></p>
                                                </div>
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
}

export default IntroPage;