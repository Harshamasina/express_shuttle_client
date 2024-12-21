import { Link } from "react-router-dom";

const HomeRibbon = () => {
    return (
        <section className="home_ribbon">
            <h3>Book your Shuttle</h3>
            <p>Enjoy a affordable and safe Ride to St Louis.</p>
            <Link className="home_ribbon_link" to="/ticket_booking">Click to Book Your Ride</Link>
        </section>
    )
};

export default HomeRibbon;