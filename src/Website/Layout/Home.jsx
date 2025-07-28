import react from 'react';
import HeroSlider from './HeroSlider/HeroSlider';
import ExploreSection from './ExploreCrafts/Explore';
import CreatorsSection from './Creator/Creator';
import BestSellers from './BestSeller/BestSeller';
import Footer from './Footer/Footer';


const WebHome = () => {



    return (
        <>
            <HeroSlider/>
            
            <ExploreSection/>
        
            <CreatorsSection/>

            <BestSellers/>

            <Footer/>
        </>
    )
}

export default WebHome;