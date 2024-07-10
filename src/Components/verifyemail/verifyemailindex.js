import React, { useState, useEffect } from "react";
import Circular from "../Progress/Progress";
import VerifyEmail from "./verifyemail";

export default function Verifyemailindex(){
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Simulating an asynchronous operation with setTimeout
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Adjust the timeout value as needed
    }, []);
return(
<>
{isLoading ? (
        <Circular isLoading={isLoading} />
      ) : (
        <VerifyEmail />
        
      )}
</>

)}