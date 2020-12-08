import React from 'react';
import Header from '../components/layouts/Header';
import MainSection from '../components/layouts/MainSection';
import Footer from '../components/layouts/Footer';
const HomePage = () => {
    console.log("API_PORT", process.env)
    return (
        <React.Fragment>
            <Header />
            <MainSection />
            <Footer />
        </React.Fragment>
    )
}
export default HomePage;