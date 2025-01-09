import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
    const { state } = useLocation();
    const { finalRide } = state || {};

    if (!finalRide) {
        return <>
            <div className="error_text">
                <h5>No booking details available. Please try again.</h5>
                <Link className="error_text_link" to="/ticket_booking">Go To Ticket Booking</Link>
            </div>
        </>;
    }

    console.log(finalRide.data);
    return (
        <div className="confirmation-page">
            <div className="confirmation-card">
                <div className="confirmation-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="confirmation-title">Payment Completed</h1>
                <p className="confirmation-order">
                    <strong>Ticket ID:</strong> #{finalRide && finalRide.data.ticket_id}
                </p>

                <div className="transaction-details">
                    <h2>Transaction Details</h2>
                    <p>
                        <strong>Ticket ID:</strong> {finalRide && finalRide.data.ticket_id}
                    </p>
                    <p>
                        <strong>Payment Ref ID:</strong> {finalRide && finalRide.data.payment_result.payment_id}
                    </p>
                    <p>
                        <strong>Payment Status:</strong> {finalRide && finalRide.data.payment_result.payment_status}
                    </p>
                    <p>
                        <strong>Payment Email:</strong> {finalRide && finalRide.data.payment_result.payment_email}
                    </p>
                    <p>
                        <strong>Total Amount:</strong> ${finalRide && finalRide.data.total_amount}
                    </p>
                </div>

                <Link to="/my_account" className="invoice-button">My Account Page</Link>

                <footer className="footer">
                    <p>Express Shuttle Services, Rolla, MO</p>
                    <p>expressshuttle71@gmail.com | +1-573-458-6555</p>
                </footer>
            </div>
        </div>
    )
};

export default BookingConfirmation;