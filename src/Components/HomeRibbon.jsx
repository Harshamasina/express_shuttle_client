import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../Context/AuthContext";

const HomeRibbon = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <section className="home_ribbon">
            <h3>Book your Shuttle</h3>
            <p>Enjoy a affordable and safe Ride to St Louis.</p>
            <Link className="home_ribbon_link" to={currentUser && currentUser ? "/ticket_booking" : "/login" }>Click to Book Your Ride</Link>
        </section>
    )
};

export default HomeRibbon;