import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import GoToTopBtn from './Components/GoToTopBtn';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Footer />
                <GoToTopBtn />
            </BrowserRouter>
        </>
    )
};

export default App;