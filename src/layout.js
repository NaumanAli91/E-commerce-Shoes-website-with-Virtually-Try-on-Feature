import React, { useState } from 'react';


const Layout = () => {
  const [toggleActive, setToggleActive] = useState(false);

  const handlingtoggle = () => {
   
    setToggleActive(!toggleActive);
  };

  return (
    <div>
      
    </div>
  );
};

export default Layout;



