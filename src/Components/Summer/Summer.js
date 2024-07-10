import React, { useState, useEffect } from "react";
import TopBar from "../Search";
import ScrollingText from "../ScrollingText/ScrollingText";
import Signupfree from "../Signupfree/Signupfree";
import Footer from "../Footer/Footer";
import ProductList from "../Products/ProductList";
import Slidertext from "../Slidertext/Slidertext";
import Circular from "../Progress/Progress"; 
import Logobar from "../Logobar/Logobar";
import Noproductsummer from "./Noproductsummer";


export default function Summer() {
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
        <Noproductsummer />
      )}
      <Signupfree />
      <Footer />
      </>
  );
}
