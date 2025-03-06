import error_404 from "../assets/error_404.jpg";
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <section className="error404_container">
            <div className="error404_img">
                <img src={error_404} alt="error 404" />
            </div>

            <div className="error404_link_container">
                <Link to="/" className="error404_link">Go To Home Page</Link>
            </div>
        </section>
    )
};

export default Error404;