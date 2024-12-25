import bus_3 from '../assets/bus_3.jpg';
import { Parallax } from 'react-parallax';
import express_shuttle_logo from "../assets/express_shuttle_logo.jpeg";

const About = () => {
    return (
        <>
            <div>
                <Parallax bgImage={bus_3} strength={300} bgImageAlt="parallaximg" blur={1}>
                    <div className='ParallaxContainer1'>
                        <div className="ParallaxDiv">
                            <div className='ParallaxPageContent'>
                                <h2>About Us</h2>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>

            <section className='about_section'>
                <div className='about_info_container'>
                    <div className='about_info_img'>
                        <img src={express_shuttle_logo} alt='shuttle bus' />
                    </div>

                    <div className='about_info'>
                        <p>At <span>Express Shuttle Services</span>, we pride ourselves on being a locally owned and operated business dedicated to providing reliable, comfortable, and efficient transportation solutions.</p>
                        <p>Based in Rolla, Missouri, our mission is to connect our community with key destinations in St. Louis and beyond. Whether you need to catch a flight, enjoy a night out at a casino, or visit loved ones, we are here to make your journey seamless and stress-free. With a commitment to safety, punctuality, and exceptional customer service, we strive to make every trip with us a pleasant experience.</p>
                    </div>
                </div>

                <div className='about_info_1'>
                    <h3>Your Trusted Transportation Partner!</h3>
                    <p>Our services cater to a wide range of travel needs, ensuring convenient shuttle options for individuals, families, and groups. We specialize in providing transportation from Rolla motels to major airports, casinos, and even correctional facilities. </p>
                    <p>With a fleet of well-maintained vehicles and professional drivers, we focus on delivering a dependable service that our clients can rely on. At Express Shuttle Services, we understand the importance of timeliness, whether it’s catching a flight or attending an important event, and we are committed to getting you there on schedule.</p>
                </div>
            </section>
        </>
    )
};

export default About;