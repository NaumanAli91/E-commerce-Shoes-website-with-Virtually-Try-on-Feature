import React, { useState, useEffect } from "react";
import Circular from "../Progress/Progress";
import Signupform from "./signupform";
export default function Indexsignupform() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <>
      {isLoading ? (
        <Circular isLoading={isLoading} />
      ) : (
        
        <Signupform />
      )}
      </>
    
  );
}
