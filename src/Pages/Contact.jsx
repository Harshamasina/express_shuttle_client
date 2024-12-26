import { Parallax } from 'react-parallax';
import contact_abstract from '../assets/contact_abstract.jpg';
import bus_1 from '../assets/bus_1.jpg';
import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [userMessage, setUserMessage] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        checkbox_1: false,
        checkbox_2: false
    });
    const [formMessage, setFormMessage] = useState("");

    const handleInputs = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setUserMessage({
              ...userMessage,
              checkbox_1: name === "checkbox_1" ? checked : false,
              checkbox_2: name === "checkbox_2" ? checked : false,
            });
          } else {
            setUserMessage({ ...userMessage, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_LOCAL_API_URL}/api/message`, userMessage);
            // console.log(res);
            setFormMessage(`${userMessage.name}, Your Message was Sent Successfully! and We will reach you soon`);
            setUserMessage({
                name: "",
                email: "",
                phone: "",
                service: "",
                message: "",
                checkbox_1: false,
                checkbox_2: false
            });
        } catch (err) {
            console.error(err);
            setFormMessage(err.response?.data?.error || "Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div>
                <Parallax bgImage={bus_1} strength={300} bgImageAlt="parallaximg" blur={1}>
                    <div className='ParallaxContainer1'>
                        <div className="ParallaxDiv">
                            <div className='ParallaxPageContent'>
                                <h2>Contact Us</h2>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>

            <div className='contact_form_container'>
                <div className="contact_item">
                    <div className="contact">
                        <div className='contact_text'>
                            <h3>Contact us for any Queries</h3>
                            <h4>For any refunds before <span>Booking Date</span></h4>
                        </div>
                        <img src={contact_abstract} alt='contact vector' />
                    </div>

                    <div className='contact_form'>
                        <h4>Send Us a Message</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="input_box">
                                <input type='text' placeholder='Enter your Name' name='name' value={userMessage.name} onChange={handleInputs} required/>
                            </div>

                            <div className="input_box">
                                <input type='email' placeholder='Enter your Email' name='email' value={userMessage.email} onChange={handleInputs} required />
                            </div>

                            <div className="input_box">
                                <input type='tel' placeholder='Enter your phone' name='phone' value={userMessage.phone} onChange={handleInputs} required />
                            </div>

                            <div className="input_box">
                                <select type='text' name='service' value={userMessage.service} onChange={handleInputs} required>
                                    <option disabled value="">Service you want to contact</option>
                                    <option value="1">Need assistance in booking Shuttle</option>
                                    <option value="2">Refund for a booking</option>
                                    <option value="3">Need ride other than the booking time</option>
                                    <option value="4">Other</option>
                                </select>
                            </div>

                            <div className="input_box">
                                <textarea type='text' cols="30" rows="10" placeholder='Enter your Message' name='message' value={userMessage.message} onChange={handleInputs} required></textarea>
                            </div>
                            
                            <div className="checkbox">
                                <input className='checkbox_input' type='checkbox' id="checkbox_1" name='checkbox_1' checked={userMessage.checkbox_1} onChange={handleInputs} />
                                <label for="checkbox_1">Yes, I agree to receive text messages from Express Shuttle Services at the phone number listed above</label>
                            </div>

                            <div className="checkbox">
                                <input className='checkbox_input' type='checkbox' id="checkbox_2" name='checkbox_2' checked={userMessage.checkbox_2} onChange={handleInputs} />
                                <label for="checkbox_2">No, I do not want to receive text messages from Express Shuttle Services</label>
                            </div>

                            <input className='input_button' type='submit' value="Send Us Message" />
                            
                            <p className='form_message'>{formMessage && formMessage}</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Contact;