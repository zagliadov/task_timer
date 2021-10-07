import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { store } from './features/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import dotenv from 'dotenv';
dotenv.config();


const stripePromise = loadStripe(String(process.env.PUBLISHABLE_KEY));

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

