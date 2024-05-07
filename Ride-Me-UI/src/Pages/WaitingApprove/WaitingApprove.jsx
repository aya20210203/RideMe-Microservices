import './WaitingApprove.css'
import { Link } from 'react-router-dom';

const WaitingApprove = () => {
    return (
        <div>
            <div className="container text-center my-5 cardRideHistory">
                <p className="fs-4">Please wait for your account approval :)</p>
                <Link to='/passengerprofile' class="btn btnRegister m-4 ">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default WaitingApprove;