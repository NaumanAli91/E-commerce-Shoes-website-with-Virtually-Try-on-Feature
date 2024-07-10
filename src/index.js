import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from "./assets/styles/theme/index"
import { ThemeProvider, CssBaseline } from "@mui/material";
import store from './store';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor=persistStore(store);
root.render(
  <React.StrictMode>
    
      <ThemeProvider key="themeKey" theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
          <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
