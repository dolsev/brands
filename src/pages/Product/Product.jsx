import React, {useState} from 'react';
import './Product.scss'
import {AddShoppingCartOutlined} from "@mui/icons-material";
import productsData from '../../assets/products.json';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartReducer";
const Product = () => {
    const { id } = useParams();
    const selectedItem = productsData.find(item => item.id === parseInt(id));

    const [quantity,setQuantity] = useState(1)
    const dispatch = useDispatch()

    return (
        <div className='product'>
            <div className='left'>
                <div className='images'>
                    <img src={selectedItem.image} alt={selectedItem.title} />
                </div>
            </div>
            <div className='right'>
                <h1>{selectedItem.title}</h1>
                <span className='price'>{selectedItem.regular_price.value} {selectedItem.regular_price.currency}</span>
                <div className='quantity'>
                    <button onClick={()=>setQuantity(prevState=>prevState===1?1:prevState-1)}>-</button>
                    {quantity}
                    <button onClick={()=>setQuantity(prevState=>prevState+1)}>+</button>
                </div>
                <button className='add' onClick={()=>dispatch(addToCart({
                    id:selectedItem.id,
                    title:selectedItem.title,
                    price:selectedItem.regular_price.value,
                    img:selectedItem.image,
                    quantity
                }))}><AddShoppingCartOutlined/>ADD TO CART</button>

            </div>
        </div>
    );
};

export default Product;

