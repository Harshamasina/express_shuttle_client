import axios from 'axios';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { LuMap } from "react-icons/lu";

const Locations = () => {
    const [STLLocation, setSTLLocation] = useState([]);
    const [RLALocation, setRLALocation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData  = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_locations`);
                const stl = res.data.filter(location => location.location_town === 'STL');
                const rla = res.data.filter(location => location.location_town === 'RLA');
                setSTLLocation(stl);
                setRLALocation(rla);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    if(loading){
        return <div>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#e5be5c"
                secondaryColor="#3a464e"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader"
            />
        </div>
    };

    return (
        <div className='locations_container'>
            <h3>St. Louis Pick Up and Drop Off Locations</h3>
            <div className='locations_cards'>
                {
                    STLLocation && STLLocation.map((data, index) => {
                        return (
                            <div key={index} className='location_card'>
                                <h4>{data.location_name}</h4>
                                <p>{data.location_address}</p>
                                <a href={data.location_link} target='_blank'>Get Directions <LuMap /></a>
                            </div>
                        )
                    })
                }
            </div>

            <h3>Rolla Pick Up and Drop Off Locations</h3>
            <div className='locations_cards'>
                {
                    RLALocation && RLALocation.map((data, index) => {
                        return (
                            <div key={index} className='location_card'>
                                <h4>{data.location_name}</h4>
                                <p>{data.location_address}</p> 
                                <a href={data.location_link} target='_blank'>Get Directions <LuMap /></a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Locations;