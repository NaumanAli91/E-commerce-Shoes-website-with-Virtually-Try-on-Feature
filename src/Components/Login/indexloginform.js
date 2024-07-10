import React, { useState, useEffect } from "react";
import Circular from "../Progress/Progress";
import Loginform from "./loginform";
export default function Indexloginform() {
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
        
        <Loginform />
      )}
     </>
    
  );
}
