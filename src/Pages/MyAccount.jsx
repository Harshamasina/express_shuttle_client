import { Parallax } from 'react-parallax';
import bus_8 from '../assets/bus_8.jpg';
import SignOutButton from "../Components/SignOutButton";
import { useContext } from "react";
import { AccountDetailsContext } from '../Context/AccountContext';

const MyAccount = () => {
    const { accountDetails } = useContext(AccountDetailsContext);
    console.log(accountDetails);
    
    return (
        <>
            <div>
                <Parallax bgImage={bus_8} strength={300} bgImageAlt="parallaximg" blur={1}>
                    <div className='ParallaxContainer1'>
                        <div className="ParallaxDiv">
                            <div className='ParallaxPageContent'>
                                <h2>My Account</h2>
                            </div>
                        </div>
                    </div>
                </Parallax>
            </div><br/>
            <SignOutButton />
        </>
    )
};

export default MyAccount;