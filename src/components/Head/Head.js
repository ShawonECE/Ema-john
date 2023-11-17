import React from 'react';
import Logo from '../../images/logo.png';
import './Head.css';
import { Link } from 'react-router-dom';

const Head = () => {
    return (
        <div className='head'>
            <img src={Logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/login">Log in</Link>
            </nav>
        </div>
    );
};

export default Head;