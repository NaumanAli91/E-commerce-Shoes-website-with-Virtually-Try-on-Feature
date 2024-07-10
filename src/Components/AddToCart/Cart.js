import React, { useState, useEffect } from "react";
import TopBar from "../Search";
import Layout from "../../layout";
import ScrollingText from "../ScrollingText/ScrollingText";
import Signupfree from "../Signupfree/Signupfree";
import Footer from "../Footer/Footer";
import CartSeperate from "./index";
import Circular from "../Progress/Progress";
import ProductDetailsContent from "../Products/ProductDetailsContent";
import Logobar from "../Logobar/Logobar";
import Slidertext from "../Slidertext/Slidertext";
export default function Cart() {
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
        <ProductDetailsContent  />
      )}
      <Signupfree />
      <Footer />
    </>
  );
}
