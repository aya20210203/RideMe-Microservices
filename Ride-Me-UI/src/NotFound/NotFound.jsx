import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container text-center my-5 cardRideHistory">
            <h2 className="fw-bolder">Sorry.</h2>
            <p className="fs-4">that page can't be found</p>
            <Link to='/passengerprofile' class="btn btnRegister m-4 ">
                Back
            </Link>
        </div>
    );
}

export default NotFound;