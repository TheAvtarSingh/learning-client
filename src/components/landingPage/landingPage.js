import React from 'react'
import "./landingPage.css"
import Navbar from '../navbar/navbar'
import SectionFormat from './sectionFormat/sectionFormat' 
import Tiles from './tilesGridSection/tiles'
import Footer from '../footer/footer'
import InvertedSectionFormat from './invertedSection/invertedSection'
function LandingPage() {
    return (
        <>
            <Navbar />
            <div className='landing-page'>
                <SectionFormat headline={"Learn the Way You Like 🥰"} description={"Let AI make the Study Plan"} imagesrc={"./images/avatar.png"} alt={"mainavatar"} />
                <Tiles />
                <SectionFormat headline={"🥹 AI Integrated Platform "} imagesrc={"./images/robot.png"} alt={"mainavatar"} />
                <InvertedSectionFormat headline={"Uplifting the Study to Next Level ✌️"} imagesrc={"./images/books.png"} alt={"mainavatar"} />
            </div>
            <Footer />
          
            
        </>
    )
}

export default LandingPage