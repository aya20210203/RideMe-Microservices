import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <div>
            <footer className="bg-black text-white p-3 ">
                <div className="container">
                    <h2 className="fs-3 fw-bold mb-3">
                        <Link to='/'>Ride Me</Link>
                    </h2>
                    <div className="row">
                        <div className="col-md-3">
                            <div>
                                <ul className="list-unstyled">
                                    <p className="fw-bold fs-4">Company</p>
                                    <li><a href="#" >About us</a></li>
                                    <li><a href="#" >Investors</a></li>
                                    <li><a href="#" >Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <p className="fw-bold fs-4">Products</p>
                                <li><a href="#">ReactJS</a></li>
                                <li><a href="#">ASP.Net</a></li>
                                <li><a href="#">SQL</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <p className="fw-bold fs-4">Global Citizenship</p>
                                <li><a href="#">Safety</a></li>
                                <li><a href="#">Diversity and Inclusion</a></li>
                                <li><a href="#">Sustainability</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <p className="fw-bold fs-4">Contacts</p>
                                <li><p><i class="fas fa-home me-3"></i> Cairo, AS 10012, EG</p></li>
                                <li><p><i class="fas fa-envelope me-3"></i>bondokahmed.ame@gmail.com</p></li>
                                <li><p><i class="fas fa-phone me-3"></i> +20 0111 7007 153</p></li>
                            </ul>
                        </div>
                        <div className="brands col-md-12 text-center mt-1">
                            <a href="#" className=" me-3"><i className="fa-brands fa-facebook"></i></a>
                            <a href="#" className=" me-3"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#" className=" me-3"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#" className=" me-3"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default Footer;