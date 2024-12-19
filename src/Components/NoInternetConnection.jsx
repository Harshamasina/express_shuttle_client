import React, { useState, useEffect } from 'react';

const NoInternetConnection = (props) => {
    const [isOnline, setOnline] = useState(true);
    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])
    window.addEventListener('online', () => {
        setOnline(true)
    });
    window.addEventListener('offline', () => {
        setOnline(false)
    });
    if(isOnline){
        return(props.children)
    } else {
        return(
            <div className='NoInternetContainer'>
                <h1 className='NoInternetIcon'>⚠</h1>
                <h2 className='NoInternet'>Database got Disconnected</h2>
                <h2 className='NoInternet'>Please Check your Internet Connection</h2>
            </div>
        )
    }
};

export default NoInternetConnection;