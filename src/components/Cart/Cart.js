import React from 'react';


const Cart = (props) => {
    let totalPrice = 0;
    let totalItems = 0;
    props.cart.map(element => totalPrice += element.price * element.quantity);
    props.cart.map(element => totalItems += element.quantity);
    let shippingCost = 0;
    if (totalPrice > 300){
        shippingCost = 0;
    }
    else if (totalPrice > 100){
        shippingCost = 5;
    }
    else if (totalPrice > 0) {
        shippingCost = 10;
    }
    return (
        <div>
            <h1>Order Summary</h1>
            <h4>Items Ordered: {totalItems}</h4>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <h4>Shipping Cost: ${shippingCost.toFixed(2)}</h4>
            <h4>To Pay: ${(totalPrice + shippingCost).toFixed(2)}</h4>
            {
                props.children
            }
        </div>
    );
};

export default Cart;