import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketBookingForm = () => {
    const [formData, setFormData] = useState({
        trip_type: "oneway",
        from_location: "",
        pick_up: "",
        pick_up_date: "",
        pick_up_time: "",
        to_location: "",
        drop_off: "",
        return_pick_up: "",
        return_pick_up_date: "",
        return_pick_up_time: "",
        return_drop_off: "",
        airline: "",
        traveler_count: "",
        notes: "",
        base_amount: "",
        total_amount: ""
    });
    const [rideOptions, setRideOptions] = useState({
        pick_up: [],
        pick_up_times: [],
        drop_off: [],
        return_pick_up: [],
        return_pick_time: [],
        return_drop_off: []
    });
    const navigate = useNavigate();

    const fetchRideSchedule = async (ride) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_schedule/${ride}`);
            const scheduleData = response.data;

            setRideOptions({
                pick_up: scheduleData.pick_up || [],
                pick_up_times: scheduleData.pick_up_times || [],
                drop_off: scheduleData.drop_off || [],
                return_pick_up: scheduleData.return_pick_up || [],
                return_pick_time: scheduleData.return_pick_time || [],
                return_drop_off: scheduleData.return_drop_off || [],
                ride_cost: scheduleData.ride_cost || 0,
                return_cost: scheduleData.return_cost || 0
            });

            setFormData((prevFormData) => ({
                ...prevFormData,
                from_location: scheduleData.from_location,
                to_location: scheduleData.to_location
            }));
        } catch (error) {
            console.error("Failed to fetch ride schedule", error);
        }
    };

    useEffect(() => {
        const calculatePayment = () => {
            const { ride_cost = 0, return_cost = 0 } = rideOptions;
            const travelers = parseInt(formData.traveler_count) || 0;
    
            if (travelers > 0) {
                let totalPayment;

                if(formData.trip_type === "oneway") {
                    totalPayment = ride_cost * travelers;
                }else if(formData.trip_type === "return") {
                    totalPayment = return_cost * travelers;
                } else {
                    totalPayment = 0
                }
    
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    base_amount: totalPayment
                }));
            } else {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    base_amount: 0
                }));
            }
        };
        calculatePayment();
    }, [formData.traveler_count, formData.trip_type, rideOptions]);

    const handleRideSelection = async (ride) => {
        await fetchRideSchedule(ride);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "traveler_count") {
            if (value <= 0) {
                alert("Number of travelers must be greater than 0.");
                setFormData({ ...formData, traveler_count: "" });
                return;
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleTripTypeChange = (type) => {
        setFormData({
            ...formData,
            trip_type: type,
            return_pick_up: '',
            return_pick_up_date: '',
            return_pick_up_time: '',
            return_drop_off: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/checkout", { state: {formData} });
    };

    return (
        <section className="booking-form-container">
            <div className="booking-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{fontSize: "20px", color: "#e5be5c", fontWeight: "600"}}>Trip Type*</label>
                        <div className="form-checkbox">
                            <label className="form-label">
                                <input
                                    type="radio"
                                    name="trip_type"
                                    value="oneway"
                                    className="form-control"
                                    checked={formData.trip_type === 'oneway'}
                                    onChange={() => handleTripTypeChange('oneway')}
                                />
                                <span></span>One Way
                            </label>
                            
                            <label className="form-label">
                                <input
                                    type="radio"
                                    name="trip_type"
                                    value="return"
                                    className="form-control"
                                    checked={formData.trip_type === 'return'}
                                    onChange={() => handleTripTypeChange('return')}
                                />
                                <span></span>Return
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: "20px", color: "#e5be5c", fontWeight: "600" }}>Select Ride*</label>
                        <div className="form-checkbox">
                            {["RLA - STL", "STL - RLA", "RLA - CLB", "CLB - RLA"].map((ride) => (
                                <label key={ride} className="form-label">
                                    <input
                                        type="radio"
                                        name="to_location"
                                        value={ride}
                                        className="form-control"
                                        checked={formData.to_location === ride}
                                        onChange={(e) => {
                                            setFormData({ ...formData, to_location: e.target.value });
                                            handleRideSelection(e.target.value);
                                        }}
                                    />
                                    <span></span>{ride}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="row form_p">
                        <p>{formData.from_location} {formData.from_location ? "-" : ""} {formData.to_location}</p>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pick_up" className="form-label">Pick-Up Location</label>
                                <select name="pick_up" value={formData.pick_up} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Pick-Up Location</option>
                                    {rideOptions.pick_up.map((location) => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="drop_off" className="form-label">Drop-Off Location</label>
                                <select name="drop_off" value={formData.drop_off} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Drop-Off Location</option>
                                    {rideOptions.drop_off.map((location) => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="date"
                                    name="pick_up_date"
                                    className="form-control"
                                    value={formData.pick_up_date}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="pick_up_date" className="form-label">Pick-Up Date</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pick_up_time" className="form-label">Pick-Up Time</label>
                                <select name="pick_up_time" value={formData.pick_up_time} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Pick-Up Time</option>
                                    {rideOptions.pick_up_times.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {formData.trip_type === 'return' && (
                        <>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="return_pick_up" className="form-label">Return Pick-Up Location</label>
                                        <select name="return_pick_up" value={formData.return_pick_up} onChange={handleChange} className="form-control">
                                            <option disabled value="">Select Return Pick-Up</option>
                                            {rideOptions.return_pick_up.map((location) => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="return_pick_up_date" className="form-label">Return Pick-Up Date</label>
                                        <input
                                            type="date"
                                            name="return_pick_up_date"
                                            className="form-control"
                                            value={formData.return_pick_up_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="return_pick_up_time" className="form-label">Return Pick-Up Time</label>
                                        <select name="return_pick_up_time" value={formData.return_pick_up_time} className="form-control" onChange={handleChange}>
                                            <option disabled value="">Select Return Pick-Up Time</option>
                                            {rideOptions.return_pick_time.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="return_drop_off" className="form-label">Return Drop-Off Location</label>
                                        <select name="return_drop_off" value={formData.return_drop_off} className="form-control" onChange={handleChange}>
                                            <option disabled value="">Select Return Drop-Off</option>
                                            {rideOptions.return_drop_off.map((location) => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="airline" className="form-label">Airlines (optional)</label>
                                <select
                                    name="airline"
                                    className="form-control"
                                    value={formData.airline}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">Select Airlines</option>
                                    <option value="AC">Air Canada</option>
                                    <option value="AS">Alaska Airlines</option>
                                    <option value="AA">American Airlines</option>
                                    <option value="DL">Delta</option>
                                    <option value="F9">Frontier</option>
                                    <option value="LH">Lufthansa</option>
                                    <option value="FDY">Southern Airways Express</option>
                                    <option value="WN">Southwest</option>
                                    <option value="NK">Spirit</option>
                                    <option value="UA">United</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="traveler_count" className="form-label">Number of Travelers</label>
                                <input
                                    type="number"
                                    name="traveler_count"
                                    className="form-control"
                                    value={formData.traveler_count}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="notes" className="form-label">Notes</label>
                            <textarea
                                name="notes"
                                className="form-control"
                                style={{height: "200px"}}
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-btn">
                        <button type="submit" className="submit-btn">Book Shuttle</button>
                    </div>
                </form>
            </div>
        </section>
    )
};

export default TicketBookingForm;