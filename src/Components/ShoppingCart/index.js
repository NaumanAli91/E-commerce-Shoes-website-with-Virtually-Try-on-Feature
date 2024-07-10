import React, { useState, useEffect } from "react";
import TopBar from "../Search";
import ScrollingText from "../ScrollingText/ScrollingText";
import Footer from "../Footer/Footer";
import Circular from "../Progress/Progress";
import CheckoutPage from "./CheckoutPage";
import Slidertext from "../Slidertext/Slidertext";
import Logobar from "../Logobar/Logobar";

export default function ShoppingCartPage() {
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
        <CheckoutPage/>
      )} 
      <Footer />
      </>
  );
}
