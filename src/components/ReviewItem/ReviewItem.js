import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, quantity, price, key} = props.product;
    return (
        <div className='ReviewItem'>
            <h3 className='productName'>{name}</h3>
            <h4>Unit Price {price}</h4>
            <h4>Total Price: {price * quantity}</h4>
            <h4>Quantity: {quantity}</h4>
            <button className='cart-btn' onClick={() => props.removeItem(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;