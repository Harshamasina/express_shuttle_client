import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from '../Pages/Home';
import About from "../Pages/About";
import Schedule from "../Pages/Schedule";
import TicketBooking from "../Pages/Ticket_Booking/TicketBooking";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error404 from '../Pages/Error404';
import express_shuttle_nav from "../assets/express_shuttle_nav.png";
import { AuthContext } from "../Context/AuthContext";
import MyAccount from '../Pages/MyAccount';
import ProtectedRoute from './ProtectedRoute';
import BookingCheckout from '../Pages/Ticket_Booking/BookingCheckout';
import BookingConfirmation from '../Pages/Ticket_Booking/BookingConfirmation';

const Navbar = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const isVerified = currentUser?.emailVerified === true;

    useEffect(() => {
        const offcanvasLinks = document.querySelectorAll('#offcanvasNavbar .nav-link');
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        
        const closeOffcanvas = () => {
            if (offcanvasElement) {
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (offcanvas) {
                    offcanvas.hide();
                }
            }
        };
        
        offcanvasLinks.forEach(link => {
            link.addEventListener('click', closeOffcanvas);
        });
        
        return () => {
            offcanvasLinks.forEach(link => {
                link.removeEventListener('click', closeOffcanvas);
            });
        };
    }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg shadow-lg fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand me-auto" to="/" aria-label='click to go to home page'>
                        <img src={express_shuttle_nav} alt='navbar_logo' className='navbar_img'></img>
                    </Link>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <img className="offcanvas-title navbar_img" id="offcanvasNavbarLabel" src={express_shuttle_nav} alt='navbar_logo'></img>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close offcanvas"></button>
                        </div>

                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" aria-current="home" aria-label='Read more about us' to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" aria-current="about us" aria-label='Read more about us' to="/about_us">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" aria-current="why us" aria-label='Read more about why to estimate' to="/schedule">Schedule</Link>
                                </li>

                                {isVerified && (
                                    <li className="nav-item">
                                        <Link className="nav-link mx-lg-2" aria-current="ticket booking" aria-label='Book tickets' to="/ticket_booking">Ticket Booking</Link>
                                    </li>
                                )}

                                <li className="nav-item contact_link">
                                    <Link className="nav-link mx-lg-2" aria-current="contact us" aria-label='Read more about how to contact us' to="/contact">Contact Us</Link>
                                </li>
                            </ul>

                            {/* Add My Account / Login links inside the sidebar for mobile */}
                            <div className="d-lg-none mt-3">
                                {isVerified ? (
                                    <Link to="/my_account" className="navbar_button">
                                        My Account
                                    </Link>
                                ) : (
                                    <Link to="/login" className="navbar_button">
                                        Login / Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add My Account / Login links in the navbar for desktop */}
                    <div className="d-none d-lg-block">
                        {isVerified ? (
                            <Link to="/my_account" className="navbar_button">
                                My Account
                            </Link>
                        ) : (
                            <Link to="/login" className="navbar_button">
                                Login / Register
                            </Link>
                        )}
                    </div>

                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/about_us' element={<About />} />
                    <Route path='/schedule' element={<Schedule />} />
                    <Route path="/ticket_booking" element={<ProtectedRoute><TicketBooking /></ProtectedRoute>} />
                    <Route path='/checkout' element={<ProtectedRoute><BookingCheckout /></ProtectedRoute>}/>
                    <Route path="/my_account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
                    <Route path='/confirmation' element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='*' element={<Error404 />} />
                </Routes>
            </div>
        </>
    )
};

export default Navbar;
