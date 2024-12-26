import axios from "axios";
import { useEffect, useState } from "react";

const TicketBookingForm = () => {
    const [locations, setLocations] = useState({ rla: [], stl: [], clb: [] });
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
        notes: ""
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_locations`);
                const rollaLocations = response.data.filter(loc => loc.location_town === 'RLA');
                const stlLocations = response.data.filter(loc => loc.location_town === 'STL');
                const clbLocations = response.data.filter(loc => loc.location_town === 'CLB');
                setLocations({ rla: rollaLocations, stl: stlLocations, clb: clbLocations });
            } catch (error) {
                console.error('Failed to fetch locations', error);
            }
        };
        fetchLocations();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        console.log(formData);
    };

    return (
        <section className="booking-form-container">
            <div className="booking-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{fontSize: "20px", color: "#e5be5c", fontWeight: "600"}}>Trip Type</label>
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

                    {/* <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pick_up" className="form-label">Pick-Up City</label>
                                <select name="pick_up" value={formData.from_location} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Pick-Up Town</option>
                                    <option value="STL">St Louis</option>
                                    <option value="RLA">Rolla</option>
                                    <option value="CLB">Colombia</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="drop_off" className="form-label">Drop-Off City</label>
                                <select name="drop_off" value={formData.to_location} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Drop-Off Town</option>
                                    <option value="STL">St Louis</option>
                                    <option value="RLA">Rolla</option>
                                    <option value="CLB">Boonville</option>
                                </select>
                            </div>
                        </div>
                    </div> */}

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pick_up" className="form-label">Pick-Up Location</label>
                                <select name="pick_up" value={formData.pick_up} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Pick-Up Location</option>
                                    {locations && locations.rla.map(location => (
                                        <option key={location._id} value={location.location_code}>{location.location_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="drop_off" className="form-label">Drop-Off Location</label>
                                <select name="drop_off" value={formData.drop_off} className="form-control" onChange={handleChange} required>
                                    <option disabled value="">Select Drop-Off Location</option>
                                    {locations && locations.stl.map(location => (
                                        <option key={location._id} value={location.location_code}>{location.location_name}</option>
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
                                <input
                                    type="time"
                                    name="pick_up_time"
                                    className="form-control"
                                    value={formData.pick_up_time}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="pick_up_time" className="form-label">Pick-Up Time</label>
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
                                            {locations.stl.map(location => (
                                                <option key={location._id} value={location.location_code}>{location.location_name}</option>
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
                                        <input
                                            type="time"
                                            name="return_pick_up_time"
                                            value={formData.return_pick_up_time}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="return_drop_off" className="form-label">Return Drop-Off Location</label>
                                        <select name="return_drop_off" value={formData.return_drop_off} className="form-control" onChange={handleChange}>
                                            <option disabled value="">Select Return Drop-Off</option>
                                            {locations.rla.map(location => (
                                                <option key={location._id} value={location.location_code}>{location.location_name}</option>
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