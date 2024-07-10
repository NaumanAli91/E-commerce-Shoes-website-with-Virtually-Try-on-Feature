import React, { useState, useEffect } from "react";
import Circular from "../Progress/Progress";
import CarouselWithContent from '../Carousel/Carousel';
import ScrollingText from "../ScrollingText/ScrollingText"
import Signupfree from "../Signupfree/Signupfree";
import TrendingNow from '../TrendingNow/TrendingNow'
import Footer from "../Footer/Footer";
import TopBar from "../Search/index";
import Slidertext from "../Slidertext/Slidertext";
import Logobar from "../Logobar/Logobar";
import Collections from "../Collections/Collections";

export default function Dashboard(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return(
    <>
      <Slidertext />
      <Logobar />
      <TopBar />
      <ScrollingText />

      {isLoading ? (
        <Circular isLoading={isLoading} />
      ) : (
        <>
          <CarouselWithContent/>
          <Collections/>
          <Signupfree />
          <TrendingNow />
        </>
      )}
      
      <Footer />
    </>
  );
}
