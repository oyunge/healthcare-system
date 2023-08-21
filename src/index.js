import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SoftUIControllerProvider } from "./context";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import { store, persistor  } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
  <SoftUIControllerProvider>
  <ToastContainer />
    <App />
  </SoftUIControllerProvider>
</BrowserRouter>
  </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
