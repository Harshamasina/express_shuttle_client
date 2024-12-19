import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { RiServiceLine } from "react-icons/ri";
import { MdOutlineSavings } from "react-icons/md";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
    return (
        <div>
            <div className="feat bg-gray pt-1 pb-5">
                <div className="container">
                    <div className="row">
                    <div className="section-head col-sm-12">
                        <h4>
                        <span>Why Choose</span> Us?
                        </h4>
                        <p>
                        Express Shuttle Services is dedicated to delivering safe, reliable, and convenient transportation solutions. 
                        We combine affordability, expertise, and a personalized approach to ensure a smooth, stress-free journey every time.
                        </p>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="item">
                        <span className="icon feature_box_col_one">
                            <RiServiceLine />
                        </span>
                        <h6>Personalized Service</h6>
                        <p>
                            As a locally owned business, we prioritize your satisfaction and well-being in every trip we provide.
                        </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="item">
                        <span className="icon">
                            <AiOutlineSafetyCertificate />
                        </span>
                        <h6>Safety & Expertise</h6>
                        <p>
                            Our vehicles undergo regular inspections, and our drivers are experienced to ensure your safety and comfort.
                        </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="item">
                        <span className="icon feature_box_col_three">
                            <MdOutlineSavings />
                        </span>
                        <h6>Affordable & Convenient</h6>
                        <p>
                            We offer competitive pricing with flexible options, making your travel smooth and hassle-free.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="home_about">
                <div className='home_content_about'>
                    <div className='about_img'>
                        <img src='https://express24plumbing.s3.ap-south-1.amazonaws.com/w_rolla_30.jpg' alt='' />
                    </div>

                    <div className='about_content'>
                        <h5>Know More About our Company</h5>
                        <span>Your trusted partner for reliable and convenient transportation in Rolla, Missouri.</span>

                        <p>Whether you need to travel from Rolla to St. Louis or vice versa, our professional shuttle services are here to meet your needs. Locally owned and operated, we understand the importance of dependable and stress-free travel. With years of experience, we are committed to providing a seamless, comfortable, and affordable transportation solution for our community.</p><br />
                        <p>At Express Shuttle Services, we prioritize your convenience and peace of mind. Our mission is to deliver timely, safe, and efficient transportation, whether you're heading to the airport, a casino, a penitentiary, or another destination. With skilled drivers, well-maintained vehicles, and a focus on customer satisfaction, we ensure every journey is smooth and enjoyable. Our shuttles are equipped with modern amenities to ensure your comfort throughout the journey, and our team is always ready to assist with any special requests. Whether you're a local resident, a visiting guest, or a business traveler, you can count on us for dependable transportation that gets you to your destination safely and on time. Experience the difference of traveling with a company that values your satisfaction above all else.</p><br />
                        <Link className="home_link" to="/about_us">Discover more About Us</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WhyChooseUs;