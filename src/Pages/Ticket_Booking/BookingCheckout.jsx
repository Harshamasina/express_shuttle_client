import { useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";


const BookingCheckout = () => {
    const { currentUser } = useContext(AuthContext);
    const { state } = useLocation();
    const { formData } = state || {};
    console.log("Form Data", formData);

    const handlePaymentSuccess = async (details) => {
        try {
            const paymentData = {
                payment_ref_id: details.id,
                payment_confirm: true,
                user_id: currentUser?.uid,
                email: currentUser?.email,
                formData
            };

            const res = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/rides`, paymentData);
            console.log("Payment and ride details saved successfully:", res.data);
        } catch (error) {
            console.error("Failed to save payment and ride details:", error);
        }
    };

    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_TEST_CLIENT_ID }}>
                <div className="checkout-container">
                    <div className="card">
                        <h2>Ride Summary</h2>
                        <p><strong>Trip Type:</strong> {formData && formData.trip_type}</p>
                        <p><strong>From:</strong> {formData && formData.pick_up} ({formData && formData.from_location})</p>
                        <p><strong>To:</strong> {formData && formData.drop_off} ({formData && formData.to_location})</p>
                        <p><strong>Pick-Up Date & Time:</strong> {formData && formData.pick_up_date} {formData && formData.pick_up_time}</p>
                        {formData && formData.trip_type === 'return' && (
                            <>
                                <p><strong>Return Pick-Up Date & Time:</strong> {formData && formDatareturn_pick_up_date} {formData && formData.return_pick_up_time}</p>
                            </>
                        )}
                        <p><strong>Traveler Count:</strong> {formData && formData.traveler_count}</p>
                        <p><strong>Notes:</strong> {formData && formData.notes}</p>
                        <h3>Total Amount: $XX.XX</h3>
                    </div>

                    <div className="payment-container">
                        <h2>Complete Your Payment</h2>
                        <PayPalButtons
                            style={{ layout: "vertical", shape:  'pill', label:  'paypal' }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: "10.00",
                                        },
                                    }],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                try {
                                    const details = await actions.order.capture();
                                    console.log("Payment approved:", details);
                                    handlePaymentSuccess(details);
                                } catch (error) {
                                    console.error("Error during payment approval:", error);
                                }
                            }}
                            onError={(error) => {
                                console.error("Error during payment:", error);
                            }}
                        />
                    </div>
                </div>
            </PayPalScriptProvider>
        </div>
    )
};

export default BookingCheckout;