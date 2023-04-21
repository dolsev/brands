import React from 'react';
import './Card.scss'
import {Link} from "react-router-dom";
function Card({item}) {
    return (
        <div className='card'>
            <Link className='link' to={`/product/${item.id}`}>
            <div className='image'>
                <img src={item.image} alt={item.title} className='mainImg'/>
                <img src={item.image} alt={item.title} className='secondImg'/>
            </div>
            <h2>{item.title}</h2>
            <div className='prices'>
                <h3>{item.regular_price.value} {item.regular_price.currency}</h3>
            </div>
            </Link>
        </div>
    );
}
export default Card;