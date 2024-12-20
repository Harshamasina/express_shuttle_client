import { Link } from 'react-router-dom';
import landing_video_2 from '../assets/landing_video_2.mp4';
import WhyChooseUs from '../Components/WhyChooseUs';
import HomeRibbon from '../Components/HomeRibbon';

const Home = () => {
    return (
        <div>
            <section className='main'>
                <div className='overlay'></div>
                <div className='info'>
                    <h1>Welcome to Express Shuttle Services</h1>
                    <p>Shuttle Services from Rolla to St Louis Airport and Casinos</p>
                    <Link to="/login">
                        <button className='home_btn'>Click to Book a Shuttle</button>
                    </Link>
                </div>

                <video className='video-bg' autoPlay muted loop>
                    <source src={landing_video_2} type='video/mp4' />
                </video>
            </section>

            <div className='home_info'>
                <h2>Locally Owned and Operated</h2>
            </div>
            <WhyChooseUs />
            <HomeRibbon />
        </div>
    )
};

export default Home;