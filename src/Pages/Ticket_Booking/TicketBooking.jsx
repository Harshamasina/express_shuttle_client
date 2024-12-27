import bus_5 from '../../assets/bus_5.jpg';
import { Parallax } from 'react-parallax';
import TicketBookingForm from './TicketBookingForm';

const TicketBooking = () => {
    return (
        <div>
            <Parallax bgImage={bus_5} strength={300} bgImageAlt="parallaximg" blur={1}>
                <div className='ParallaxContainer1'>
                    <div className="ParallaxDiv">
                        <div className='ParallaxPageContent'>
                            <h2>Book Your Shuttle</h2>
                            <div className='ul'>
                                <ul>
                                    <li>*STL Airport Daily Rides</li>
                                    <li>*Boonville only on friday's every week</li>
                                    <li>*St Louis Casino's only on Saturday's every week</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>

            <TicketBookingForm />
        </div>
    )
};

export default TicketBooking;