import React, { useContext, useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { useNavigate } from "react-router-dom";
import { ProductContext } from '../../App';

const Review = () => {
    const [allProducts, setAllProducts] = useContext(ProductContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleCheckOut = () => {
        navigate('/shipment');
    };

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

    const removeItem = (key) => {
        const newCart = cart.filter(item => item.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    }
    
    return (
        <div className='shop-container'>
            <div className='product-container'>
            {
                cart.map(element => <ReviewItem removeItem={removeItem} product={element}></ReviewItem>)
            }
            </div>
            <div className='product-cart'>
                <Cart cart={cart}>
                    <button onClick={handleCheckOut} className='cart-btn'>Place Order</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;