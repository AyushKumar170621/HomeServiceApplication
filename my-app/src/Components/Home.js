import React from 'react';

import Header from './Header';
import Footer from './Footer';
import SliderSection from './Slider';
import FeatureSection from './Feature';
import AboutSection from './About';
import ProfessionalSection from './Professional';
import ServiceSection from './Service';
import ContactSection from './Contact';
function Home() {
    return (
      <div >
       
       <SliderSection/>
       <FeatureSection/>
       <AboutSection/>
       <ProfessionalSection/>
       <ServiceSection/>
       <ContactSection/>
       
      </div>
    );
  }
  
  export default Home;
  