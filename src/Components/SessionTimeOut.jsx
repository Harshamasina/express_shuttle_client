import { useContext, useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IoMdLogOut } from "react-icons/io";

const SessionTimeOut = () => {
    const { currentUser } = useContext(AuthContext);
    const [sessionExpired, setSessionExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (!currentUser) return;
    
        try {
            let storedLoginTime = localStorage.getItem("loginTime");
            console.log("Stored Login Time", storedLoginTime)
        
            // If not stored, use currentUser metadata or fallback to now
            if (!storedLoginTime) {
                if (currentUser.metadata && currentUser.metadata.lastSignInTime) {
                    storedLoginTime = currentUser.metadata.lastSignInTime;
                } else {
                    storedLoginTime = moment().toISOString();
                }
                localStorage.setItem("loginTime", storedLoginTime);
            }
        
            // Parse the login time using moment.js
            const loginMoment = moment(storedLoginTime);
            if (!loginMoment.isValid()) {
                throw new Error("Invalid login time");
            }
        
            const sessionDuration = moment.duration(5, 'hours');
            const now = moment();
            const elapsed = moment.duration(now.diff(loginMoment));
        
            if (elapsed.asMilliseconds() >= sessionDuration.asMilliseconds()) {
                // Session already expired
                setSessionExpired(true);
            } else {
                // Calculate the remaining time until session expiry
                const remainingDuration = sessionDuration.subtract(elapsed);
                const remainingMilliseconds = remainingDuration.asMilliseconds();
                console.log(remainingDuration);
                console.log(remainingMilliseconds);
                timer = setTimeout(() => {
                    setSessionExpired(true);
                }, remainingMilliseconds);
            }
        } catch (error) {
            console.error("Error handling session timeout: ", error);
            setSessionExpired(true);
        }
    
        // Clean up the timer on component unmount
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [currentUser]);

    const handleSessionExpiry = async () => {
        // Hide the modal immediately
        setSessionExpired(false);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out: ", error);
        } finally {
            // Remove the stored login time and navigate to login page
            localStorage.removeItem("loginTime");
            navigate('/login');
        }
    };

    return (
        <>
            <Modal 
                show={sessionExpired}
                onHide={handleSessionExpiry}
                centered
                className='modal'
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title className='modal_title'>Session Time Out!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal_info'>
                    <p>Your session has expired. Please login again.</p>
                    <Button className='modal_button' variant="primary" onClick={handleSessionExpiry}>
                        Go to Login
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
};

export default SessionTimeOut;
