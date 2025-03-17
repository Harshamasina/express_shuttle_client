import { Link, useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { GrBus } from "react-icons/gr";

const BookingCheckout = () => {
    const { currentUser } = useContext(AuthContext);
    const { state } = useLocation();
    const { formData } = state || {};
    const navigate = useNavigate();
    const [taxRate, setTaxRate] = useState(null);
    const [taxRateError, setTaxRateError] = useState(null);

    // Check for formData
    if (!formData) {
        return (
            <div className="error_text">
                <h5>No booking checkout available. Please try again.</h5>
                <Link className="error_text_link" to="/ticket_booking">
                    Go To Ticket Booking
                </Link>
            </div>
        );
    }

    // Fetch tax rate based on from_location and to_location from formData
    useEffect(() => {
        const fetchTaxRate = async () => {
            try {
                if (formData.from_location && formData.to_location) {
                    const res = await axios.get(
                        `${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_tax_rate`,
                        {
                            params: {
                                from_location: formData.from_location,
                                to_location: formData.to_location,
                            },
                        }
                    );
                    setTaxRate(res.data.tax_rate);
                    setTaxRateError(null);
                } else {
                    setTaxRateError("Missing from_location or to_location");
                    setTaxRate(5.2);
                }
            } catch (error) {
                console.error("Error fetching tax rate:", error);
                setTaxRateError(
                    error.response?.data?.message || "Failed to fetch tax rate"
                );
                setTaxRate(5.2);
            }
        };
        fetchTaxRate();
    }, [formData]);

    if (taxRate === null) {
        return <div>Loading tax rate...</div>;
    }

    const baseAmount = formData?.base_amount || 0;
    const totalAmount = (baseAmount + (baseAmount * taxRate) / 100).toFixed(2);

    const handlePaymentSuccess = async (details) => {
        try {
            const paymentData = {
                ...formData,
                payment_result: {
                    payment_id: details.id,
                    payment_status: details.status,
                    paid_at: details.create_time,
                    payment_email: details.payer.email_address,
                },
                acc_id: currentUser?.uid,
                acc_email: currentUser?.email,
                total_amount: totalAmount,
            };
            const res = await axios.post(
                `${import.meta.env.VITE_LOCAL_API_URL}/api/rides`,
                paymentData
            );
            navigate("/confirmation", { state: { finalRide: res.data } });
        } catch (error) {
            console.error("Failed to save payment and ride details:", error);
            alert(
                "An error occurred while processing your payment. Please contact support."
            );
        }
    };

    const handleCancel = () => {
        console.log("Payment cancelled.");
        alert("Payment was cancelled. Please try again.");
        navigate("/ticket_booking");
    };

    const handleError = (error) => {
        console.error("Error during payment:", error);
        alert("An unexpected error occurred during payment. Please try again.");
    };

    return (
        <section className="checkout">
            <PayPalScriptProvider
                options={{
                    "client-id": import.meta.env.VITE_PAYPAL_TEST_CLIENT_ID,
                }}
            >
                <div className="checkout-container">
                    <div className="card">
                        <h2>
                            Ride Summary <span><GrBus /></span>
                        </h2>
                        <div className="card_details">
                            <p>
                                <strong>Trip Type:</strong> {formData.trip_type}
                            </p>
                            <p>
                                <strong>From:</strong> {formData.pick_up} (
                                {formData.from_location})
                            </p>
                            <p>
                                <strong>To:</strong> {formData.drop_off} (
                                {formData.to_location})
                            </p>
                            <p>
                                <strong>Pick-Up Date & Time:</strong> {formData.pick_up_date}{" "}
                                & {formData.pick_up_time}
                            </p>
                            {formData.trip_type === "return" && (
                                <>
                                    <p>
                                        <strong>Return Pick-Up Date & Time:</strong>{" "}
                                        {formData.return_pick_up_date} &{" "}
                                        {formData.return_pick_up_time}
                                    </p>
                                </>
                            )}
                            <p>
                                <strong>Traveler Count:</strong> {formData.traveler_count}
                            </p>
                            <p>
                                <strong>Notes:</strong> {formData.notes}
                            </p>
                            <p>
                                <strong>Ride Cost (w/o Taxes):</strong> ${baseAmount}
                            </p>
                            <p>
                                <strong>Tax Rate:</strong> {taxRate}%
                            </p>
                        </div>
                        <h3>Total Amount (inc. Taxes): ${totalAmount}</h3>
                        {taxRateError && (
                            <p className="error_text">
                                {taxRateError}. Using default tax rate.
                            </p>
                        )}
                    </div>

                    <div className="payment-container">
                        <h2>Complete Your Payment</h2>
                        <PayPalButtons
                            style={{ layout: "vertical", shape: "pill", label: "paypal" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalAmount,
                                                currency_code: "USD",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                try {
                                    const details = await actions.order.capture();
                                    handlePaymentSuccess(details);
                                } catch (error) {
                                    handleError(error);
                                }
                            }}
                            onCancel={handleCancel}
                            onError={handleError}
                        />
                    </div>
                </div>
            </PayPalScriptProvider>
        </section>
    );
};

export default BookingCheckout;
