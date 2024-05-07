import { Link } from 'react-router-dom';
import './RegisterMainPage.css';

const RegisterMainPage = () => {
    return (
        <div>
            <div className="container my-5">
                <div class="row cardRegisterMain ">
                    <div class=" text-center fw-bold">
                        <h2 className='fw-bold'>Choose registeration based on your role .</h2>
                        <div class="row d-flex justify-content-around flex-row">

                            <Link to='/registerdriver' class="btn form-btn m-4 col-5 fs-2">
                                Driver 
                            </Link>

                            <Link to='registerpassenger' class="btn form-btn m-4 col-5 fs-2">
                                Passenger
                            </Link>

                            <Link to='/intropage' class="btn btn-danger m-4 w-25 fs-5">Back</Link>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default RegisterMainPage;