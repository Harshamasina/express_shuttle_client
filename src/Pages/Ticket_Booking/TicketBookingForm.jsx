import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const TicketBookingForm = () => {
    const [formData, setFormData] = useState({
        trip_type: "oneway",
        from_location: "",
        to_location: "",
        pick_up: "",
        pick_up_date: "",
        pick_up_time: "",
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
        return_pick_up_times: [],
        return_drop_off: []
    });

    const [rideCost, setRideCost] = useState(0);
    const [seatCount, setSeatCount] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const fetchRideSchedule = async (to_location, from_location, trip_type) => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/route_details`, {
            params: { to_location, from_location, trip_type }
        });

        const scheduleData = response.data;

        setRideOptions({
            pick_up: scheduleData.pick_up || [],
            pick_up_times: scheduleData.pick_up_times || [],
            drop_off: scheduleData.drop_off || [],
            return_pick_up: scheduleData.return_pick_up || [],
            return_pick_up_times: scheduleData.return_pick_up_times || [],
            return_drop_off: scheduleData.return_drop_off || []
        });

        setFormData((prevFormData) => ({
            ...prevFormData,
            from_location,
            to_location
        }));

        fetchRideCost(to_location, from_location, trip_type);
        } catch (error) {
        console.error("Failed to fetch ride schedule:", error);
        }
    };

    const fetchRideCost = async (to_location, from_location, trip_type) => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_costs`, {
            params: { to_location, from_location, trip_type }
        });

        const cost = response.data.cost || 0;
        setRideCost(cost);
        } catch (error) {
        console.error("Failed to fetch ride cost:", error);
        setRideCost(0);
        }
    };

    useEffect(() => {
        const travelers = parseInt(formData.traveler_count) || 0;
        const totalCost = travelers > 0 ? rideCost * travelers : 0;

        setFormData((prevFormData) => ({
        ...prevFormData,
        base_amount: totalCost
        }));
    }, [formData.traveler_count, rideCost]);

    const handleRideSelection = async (ride) => {
        const [from_location, to_location] = ride.split(" - ");
        await fetchRideSchedule(to_location, from_location, formData.trip_type);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTripTypeChange = (type) => {
        setFormData({
        ...formData,
        trip_type: type,
        return_pick_up: "",
        return_pick_up_date: "",
        return_pick_up_time: "",
        return_drop_off: ""
        });

        if (formData.to_location && formData.from_location) {
        fetchRideSchedule(formData.to_location, formData.from_location, type);
        }
    };

    const openModal = (title, body, isErrorFlag = false) => {
        setModalTitle(title);
        setModalBody(body);
        setIsError(isErrorFlag);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleCheckout = () => {
        setShowModal(false);
        navigate("/checkout", { state: { formData } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.traveler_count <= 0) {
            openModal(
                "Travelers Count Error",
                "Traveler count should be 1 or more.",
                true
            );
            return;
        }

        if(formData.traveler_count > 11) {
            openModal(
                "Travelers Count Error",
                "Travelers count should not be greater than 11. Contact us if you want book more than 11 Seats.",
                true
            );
            return
        }

        const today = moment().startOf("day");
        const pickUpDate = moment(formData.pick_up_date).startOf("day");

        if (pickUpDate.isBefore(today)) {
            openModal(
                "Date Error",
                "Pick-Up Date cannot be before today.",
                true
            );
            return;
        }

        if (formData.trip_type === "return") {
            const returnPickUpDate = moment(formData.return_pick_up_date).startOf("day");

            if (returnPickUpDate.isBefore(today)) {
                openModal(
                    "Date Error",
                    "Return Pick-Up Date cannot be before today.",
                    true
                );
                return;
            }

            if (returnPickUpDate.isBefore(pickUpDate)) {
                openModal(
                    "Date Error",
                    "Return Pick-Up Date cannot be before the Pick-Up Date.",
                    true
                );
                return;
            }
        }

        try {
            let seatCountResponse;

            if (formData.trip_type === "return") {
                seatCountResponse = await axios.get(
                `${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_seats_count`,
                {
                    params: {
                    trip_type: "return",
                    from_location: formData.from_location,
                    to_location: formData.to_location,
                    pick_up_date: formData.pick_up_date,
                    pick_up_time: formData.pick_up_time,
                    return_pick_up_date: formData.return_pick_up_date,
                    return_pick_up_time: formData.return_pick_up_time
                    }
                }
            );
        } else {
            seatCountResponse = await axios.get(
            `${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_seats_count`,
            {
                params: {
                trip_type: "oneway",
                from_location: formData.from_location,
                to_location: formData.to_location,
                pick_up_date: formData.pick_up_date,
                pick_up_time: formData.pick_up_time
                }
            }
            );
        }

        const seatData = seatCountResponse.data;
        setSeatCount(seatData);

        const requestedTravelers = parseInt(formData.traveler_count, 10) || 0;

        if (formData.trip_type === "oneway") {
            const availableSeats = seatData.seats_remaining || 0;

            if (requestedTravelers > availableSeats) {
                openModal(
                    "Not Enough Seats",
                    `You requested ${requestedTravelers} seat(s), but only ${availableSeats} are available for your one-way trip. Please choose different Date/Time`,
                    true
                );
                return;
            }
            } else {
                const outboundSeats = seatData.outbound_seats_remaining || 0;
                const returnSeats = seatData.return_seats_remaining || 0;
                if (requestedTravelers > outboundSeats || requestedTravelers > returnSeats) {
                    openModal(
                        "Not Enough Seats",
                        `You requested ${requestedTravelers} seat(s). 
                        Outbound seats available: ${outboundSeats}, 
                        Return seats available: ${returnSeats}. 
                        Please reduce the number of travelers or choose different dates/times.`,
                        true
                    );
                    return;
                }
        }

        let seatMsg = "";
        if (formData.trip_type === "oneway") {
            seatMsg = `Seats Remaining: ${seatData.seats_remaining || 0}`;
        } else {
            seatMsg = `Outbound Seats Remaining: ${seatData.outbound_seats_remaining || 0}\n` +
                    `Return Seats Remaining: ${seatData.return_seats_remaining || 0}`;
        }

        openModal("Seat Availability", seatMsg, false);
        } catch (err) {
            console.error("Error fetching seat count:", err);
            const msg = err.response?.data?.message || "Error fetching seat count";
            openModal("Error", msg, true);
        }
    };

    return (
        <section className="booking-form-container">
            <div className="booking-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{ fontSize: "20px", color: "#e5be5c", fontWeight: "600" }}>Trip Type*</label>
                        <div className="form-checkbox">
                        <label className="radio-label">
                            <input
                            type="radio"
                            name="trip_type"
                            value="oneway"
                            checked={formData.trip_type === "oneway"}
                            onChange={() => handleTripTypeChange("oneway")}
                            />
                            <span></span>One Way
                        </label>

                        <label className="radio-label">
                            <input
                            type="radio"
                            name="trip_type"
                            value="return"
                            checked={formData.trip_type === "return"}
                            onChange={() => handleTripTypeChange("return")}
                            />
                            <span></span>Return
                        </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: "20px", color: "#e5be5c", fontWeight: "600" }}>Select Ride*</label>
                        <div className="form-checkbox">
                        {["RLA - STL", "STL - RLA", "RLA - CLB", "CLB - RLA"].map((ride) => (
                            <label key={ride} className="radio-label">
                            <input
                                type="radio"
                                name="to_location"
                                value={ride}
                                checked={formData.to_location === ride}
                                onChange={(e) => handleRideSelection(e.target.value)}
                            />
                            <span></span>{ride}
                            </label>
                        ))}
                        </div>
                    </div>

                    <div className="row form_p">
                        <p>
                            {formData.from_location} {formData.from_location ? "-" : ""} {formData.to_location}
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Pick-Up Location*</label>
                                <select
                                name="pick_up"
                                value={formData.pick_up}
                                className="form-control"
                                onChange={handleChange}
                                required
                                >
                                <option disabled value="">
                                    Select Pick-Up Location
                                </option>
                                {rideOptions.pick_up.map((location) => (
                                    <option key={location} value={location}>
                                    {location}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Drop-Off Location*</label>
                                <select
                                    name="drop_off"
                                    value={formData.drop_off}
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                >
                                <option disabled value="">
                                    Select Drop-Off Location
                                </option>
                                {rideOptions.drop_off.map((location) => (
                                    <option key={location} value={location}>
                                    {location}
                                    </option>
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
                            <label htmlFor="pick_up_date" className="form-label">
                                Pick-Up Date*
                            </label>
                        </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="form-label">Pick-Up Time*</label>
                                <select
                                    name="pick_up_time"
                                    value={formData.pick_up_time}
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                >
                                <option disabled value="">
                                    Select Pick-Up Time
                                </option>
                                {rideOptions.pick_up_times.map((time) => (
                                    <option key={time} value={time}>
                                    {time}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {formData.trip_type === "return" && (
                        <>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Return Pick-Up Location*</label>
                                    <select
                                        name="return_pick_up"
                                        value={formData.return_pick_up}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                    <option disabled value="">
                                        Select Return Pick-Up
                                    </option>
                                    {rideOptions.return_pick_up.map((location) => (
                                        <option key={location} value={location}>
                                        {location}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="return_pick_up_date" className="form-label">
                                        Return Pick-Up Date*
                                    </label>
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
                                    <label className="form-label">Return Pick-Up Time*</label>
                                    <select
                                        name="return_pick_up_time"
                                        value={formData.return_pick_up_time}
                                        className="form-control"
                                        onChange={handleChange}
                                    >
                                    <option disabled value="">
                                        Select Return Pick-Up Time
                                    </option>
                                    {rideOptions.return_pick_up_times.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Return Drop off*</label>
                                    <select
                                        name="return_drop_off"
                                        value={formData.return_drop_off}
                                        className="form-control"
                                        onChange={handleChange}
                                    >
                                    <option disabled value="">
                                        Select Return Drop Off
                                    </option>
                                    {rideOptions.return_drop_off.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
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
                                <label htmlFor="airline" className="form-label">
                                    Airlines (optional)
                                </label>
                                <select
                                    name="airline"
                                    className="form-control"
                                    value={formData.airline}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">
                                        Select Airlines
                                    </option>
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
                                <label htmlFor="traveler_count" className="form-label">
                                    Number of Travelers*
                                </label>
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
                                style={{ height: "200px" }}
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-btn">
                        <button type="submit" className="submit-btn">
                            Book Shuttle
                        </button>
                    </div>
                </form>
            </div>

            <Modal show={showModal} onHide={handleClose} centered className='modal' backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title className='modal_title'>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ whiteSpace: "pre-wrap" }} className='modal_info'>
                    <p>{modalBody}</p>
                </Modal.Body>

                <Modal.Footer>
                    {isError ? (
                        <Button className='modal_button' variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    ) : (
                        <>
                            <Button className='modal_close_button' variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className='modal_button' variant="primary" onClick={handleCheckout}>
                                Continue to Checkout
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default TicketBookingForm;
