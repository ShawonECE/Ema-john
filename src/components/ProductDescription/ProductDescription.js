import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { ProductContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const ProductDescription = () => {
    const {productKey} = useParams();
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

    const product = allProducts.find(element => element.key === productKey);
    return (
        <div>
            <h1>Product Description</h1>
            <Product addProduct={addProduct} product={product}></Product>
        </div>
    );
};

export default ProductDescription;