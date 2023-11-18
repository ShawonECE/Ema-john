import { createContext, useEffect, useState } from 'react';
import './App.css';
import Head from './components/Head/Head';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NoMatch from './components/NotFound/NoMatch';
import ProductDescription from './components/ProductDescription/ProductDescription';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const ProductContext = createContext();

function App() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch('https://ema-john-server-34ue.onrender.com/all_products')
    .then(res => res.json())
    .then(data => setAllProducts(data));
  }, []);

  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  });
  return (
    <ProductContext.Provider value={[allProducts, setAllProducts]}>
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Router>
        <Head></Head>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/review' element={<Review/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/shipment' element={<Shipment/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
          </Route>
          
          <Route path='/product/:productKey' element={<ProductDescription/>}/>
          <Route path='*' element={<NoMatch/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
