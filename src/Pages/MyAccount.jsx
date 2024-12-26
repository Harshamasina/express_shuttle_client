import { Parallax } from 'react-parallax';
import bus_8 from '../assets/bus_8.jpg';
import SignOutButton from "../Components/SignOutButton";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { AuthContext } from "../Context/AuthContext";
import axios from 'axios';
import { MutatingDots } from 'react-loader-spinner';

const MyAccount = () => {
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const userId = currentUser.uid;
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_fb_id/${userId}`);
                setLoading(false);
                setAccount(res.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const today = moment();
    const upcomingRides = account?.past_rides?.filter(ride => moment(ride.pickup_date).isAfter(today)) || [];
    const pastRides = account?.past_rides?.filter(ride => moment(ride.pickup_date).isBefore(today)) || [];

    const userType = {
        S: "Student",
        V: "Veteran",
        SC: "Senior Citizen",
        O: "Other"
    };

    const userTypeDisplay = userType[account?.user_type] || "Unknown";

    if(loading){
        return <div>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#e5be5c"
                secondaryColor="#3a464e"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader"
            />
        </div>
    };
    
    return (
        <>
            <div>
                <Parallax bgImage={bus_8} strength={300} bgImageAlt="parallaximg" blur={1}>
                    <div className='ParallaxContainer1'>
                        <div className="ParallaxDiv">
                            <div className='ParallaxPageContent'>
                                <h2>My Account</h2>
                                <SignOutButton />
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div><br/>

            <div className='account_container'>
                <div className='main-body'>
                    <div className="row gutters-sm">
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Date of Birth</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.dob}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{account?.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Category</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            <p>{userTypeDisplay}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>

                            <div>
                                <h5>Upcoming Rides</h5>
                                <div className='row'>
                                {upcomingRides.length > 0 ? (
                                    upcomingRides.map((ride, index) => (
                                        <div key={index} className='col-sm-6 mb-3'>
                                            <div className="card h-100">
                                                <div className='card-body'>
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Amount</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>${ride.payment}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Ticket ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.ticket_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Ref ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.payment_ref_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Trip Type</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.trip_type}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Persons Count</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.personCount}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Booking Date</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.booking_date}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.from_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pick Up Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pick_up}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pickup Date and Time</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pickup_date}, {ride.pick_time}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.to_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.drop_off}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    
                                                    {ride.trip_type === 'return' && (
                                                        <>
                                                           <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup Date</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup Time</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up_time}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Drop Off</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_drop_off}</p>
                                                                </div>
                                                            </div>
                                                            <hr /> 
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No upcoming rides.</p>
                                )}
                                </div>
                            </div>
                            
                            <div>
                                <h5>Past Rides</h5>
                                <div className='row'>
                                {pastRides.length > 0 ? (
                                    pastRides.map((ride, index) => (
                                        <div key={index} className='col-sm-6 mb-3'>
                                            <div className="card h-100">
                                                <div className='card-body'>
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Amount</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>${ride.payment}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Ticket ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.ticket_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Payment Ref ID</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.payment_ref_id}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Trip Type</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.trip_type}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Persons Count</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.personCount}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Booking Date</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.booking_date}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.from_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pick Up Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pick_up}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Pickup Date and Time</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.pickup_date}, {ride.pick_time}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off City</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.to_location}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className="col-sm-4">
                                                            <h6 className="mb-0">Drop off Location</h6>
                                                        </div>
                                                        <div className="col-sm-8 text-secondary">
                                                            <p>{ride.drop_off}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    
                                                    {ride.trip_type === 'return' && (
                                                        <>
                                                           <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup Date</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Pickup Time</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_pick_up_time}</p>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className="col-sm-4">
                                                                    <h6 className="mb-0">Return Drop Off</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">
                                                                    <p>{ride.return_drop_off}</p>
                                                                </div>
                                                            </div>
                                                            <hr /> 
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No past rides.</p>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MyAccount;