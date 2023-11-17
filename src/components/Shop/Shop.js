import React, { useState, useEffect, useContext } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../App';


const Shop = () => {
    const [allProducts, setAllProducts] = useContext(ProductContext);
    const [cart, setCart] = useState([]);

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

    const addProduct = (currentProduct) => {
        const keyToBeAdded = currentProduct.key;
        const sameProduct = cart.find(product => product.key === keyToBeAdded);
        let newCart;
        let count = 1;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const otherProducts = cart.filter(product => product.key !== keyToBeAdded);
            newCart = [...otherProducts, sameProduct];
        }
        else {
            currentProduct.quantity = 1;
            newCart = [...cart, currentProduct];
        }
        setCart(newCart);
        addToDatabaseCart(currentProduct.key, count);
    };
    
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    allProducts.map(element => <Product addProduct={addProduct} product={element}></Product>)
                }
            </div>
            <div className='product-cart'>
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='cart-btn'>Order Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;