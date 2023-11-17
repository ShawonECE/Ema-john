import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, seller, price, key, img} = props.product;
    return (
        <div className='singleProduct'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='description'>
                <h4 className='productName'><Link to={'/product/'+key}>{name}</Link></h4>
                <h5>By: {seller}</h5>
                <h5>${price}</h5>
                <button className='cart-btn' onClick={() => props.addProduct(props.product)}><FontAwesomeIcon icon={faCartShopping} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;