import bus_4 from '../assets/bus_4.jpg';
import { Parallax } from 'react-parallax';
import Locations from '../Components/Locations';
import TimeSchedule from '../Components/TimeSchedule';

const Schedule = () => {
    return (
        <>
            <div>
                <Parallax bgImage={bus_4} strength={300} bgImageAlt="parallaximg" blur={1}>
                    <div className='ParallaxContainer1'>
                        <div className="ParallaxDiv">
                            <div className='ParallaxPageContent'>
                                <h2>Bus Schedule</h2>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div>
            <TimeSchedule />
            <Locations />
        </>
    )
};

export default Schedule;