import React, { useState, useEffect } from "react";
import TopBar from "../Search";
import ScrollingText from "../ScrollingText/ScrollingText";
import Signupfree from "../Signupfree/Signupfree";
import Footer from "../Footer/Footer";
import TrendingNow from "../TrendingNow/TrendingNow";
import Circular from "../Progress/Progress"; 
import Searchfunctionality from "./Searchfunctionality";
import Slidertext from "../Slidertext/Slidertext";
import Logobar from "../Logobar/Logobar";
export default function Searchpage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);
  return (
    <>
    <Slidertext />
    <Logobar />
      <TopBar />
      <ScrollingText />
      {isLoading ? (
        <Circular isLoading={isLoading} />
      ) : (
       <Searchfunctionality />
      )}
      <Signupfree />
      <TrendingNow />
      <Footer />
      </>
  );
}
