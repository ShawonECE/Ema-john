import React, { useContext, useEffect, useState } from 'react';
import { ProductContext, UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [cart, setCart] = useState([]);
    const [allProducts, setAllProducts] = useContext(ProductContext);

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(allProducts.length > 0) {
            const cartProducts = productKeys.map(key => {
                const product = allProducts.find(product => product.key === key);
                product.quantity = savedCart[key];
                return product;
            }
    )
        setCart(cartProducts);
    }}, [allProducts]);

    const defaultInfo = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [info, setInfo] = useState(defaultInfo);

    const handleBlur = (event) => {
        const newInfo = {...info};
        newInfo[event.target.name] = event.target.value;
        setInfo(newInfo);
    };

    const placeOrder = (event) => {
        const newInfo = {...info};
        newInfo.products = cart;
        newInfo.user = loggedInUser;
        console.log(newInfo);
        fetch('http://localhost:4000/place_order', {
            method: 'POST',
            body: JSON.stringify(newInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
            })
            .then(response => response.json())
            .then(data => {
                processOrder();
                setCart([]);
            });
        event.preventDefault();
    }

    return (
        <div className='container'>
            <h3>Please give some information</h3>
            <form onSubmit={placeOrder}>
                <input type="text" placeholder='Name' name='name' className='input' defaultValue={loggedInUser.name} onBlur={handleBlur}/>
                <br /><br />
                <input type="text" placeholder='Email' name='email' className='input' defaultValue={loggedInUser.email} onBlur={handleBlur}/>
                <br /><br />
                <input type="text" placeholder='Address' name='address' className='input' onBlur={handleBlur} required/>
                <br /><br />
                <input type="text" placeholder='Phone Number' name='phone' className='input' onBlur={handleBlur} required/>
                <br /><br />
                <input type="submit" value='Submit' disabled={!(cart.length > 0)}/>
            </form>
        </div>
    );
};

export default Shipment;