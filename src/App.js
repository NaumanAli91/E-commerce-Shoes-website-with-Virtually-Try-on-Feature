import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './assets/styles/chat.css';
import './assets/styles/globals.css';
import './assets/styles/rtl.css';
import './assets/styles/dark.css';
import './assets/styles/leftSidebarDark.css';
import { routesName } from './Routes/routes';
import Dashboard from './Components/Dashboard/Dashboard';
import Winter from './Components/Winter/Winter';
import Cart from './Components/AddToCart/Cart';
import ShoppingCartPage from './Components/ShoppingCart';
import ShowCart from './Components/ShowCart/ShowCart';
import Indexsignupform from './Components/Login/indexsignupform';
import Indexloginform from './Components/Login/indexloginform';
import Searchpage from './Components/Search/Searchpage';
import Menshoes from './Components/Menshoes/Menshoes';
import Womenshoes from './Components/Womenshoes/Womenshoes';
import Orderhistory from './Components/Orderhistory/index';
import Verifyemailindex from './Components/verifyemail/verifyemailindex'
import Category from './Components/Category/Category';
import DeepARComponent from './Components/virtualtryroom/DeepARComponent';
import Summer from './Components/Summer/Summer';
import Caps from './Components/Caps/Caps';
import PoloShirt from './Components/PoloShirt/PoloShirt';
function App() {
  const routes = [
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: routesName.Summer,
      element: <Summer />,
    },
    {
      path: routesName.Winter,
      element: <Winter />,
    },
    {
      path: 'Shoe/:product_id', 
      element: <Cart />,
    },
    {
      path: 'Category/:subcategory', 
      element: <Category />,
    },
    {
      path: routesName.ShoppingCart,
      element: <ShoppingCartPage />,
    },
    {
      path: routesName.ShowCart,
      element: <ShowCart />,
    },
    {
      path: routesName.login,
      element: <Indexloginform />,
    },
    {
      path: routesName.signup,
      element: <Indexsignupform />,
    },
    {
      path: routesName.Searchpage,
      element: <Searchpage />,
    },
    {
      path: routesName.menshoes,
      element: <Menshoes />,
    },
    {
      path: routesName.womenshoes,
      element: <Womenshoes />,
    },
    {
      path: routesName.Orderhistory,
      element: <Orderhistory />,
    },
    {
      path: routesName.verifyemail,
      element: <Verifyemailindex />,
    },
    {
      path: routesName.shirts,
      element: <PoloShirt />
    },
    {
      path: routesName.caps,
      element: <Caps />
    },
    {
      path: 'VirtualTry/:product_id',
      element: <DeepARComponent />,
    },
    
  ];

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
