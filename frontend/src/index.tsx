import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { store } from './features/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
dotenv.config();



const promise = loadStripe('pk_test_51JhH0JB9mZymtsm6QTz40QG5qUEm1nRn1aZhM8v5BtPcIijO99Ihl3fgCzt4zREKuziigRZ1OH6uqBJGayyt9FMb00CNGjTVB6');


ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={promise}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);

