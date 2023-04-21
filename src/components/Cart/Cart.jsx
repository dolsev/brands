//Cart.jsx
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Cart.scss'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useNavigate } from "react-router-dom";

function Cart() {
    const products = useSelector(state => state.cart.products)
    const totalPrice = () => {
        let total = 0
        products.forEach(item => total += item.quantity * item.price)
        return total.toFixed(2);
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCheckout = () => {
        const data = { products, totalPrice: totalPrice() }
        fetch('https://app.aaccent.su/js/confirm.php', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.result === 'ok') {
                    setIsModalOpen(true)
                }
            })
            .catch(error => console.error('Error:', error))
    }

    const handleCloseModal = () => {
        dispatch(resetCart());
        navigate('/');
        setIsModalOpen(false)
    }

    return (
        <div className='cart'>
            <h1>Products in your cart</h1>
            {products?.map(item => {
                return <div className='item' key={item.id}>
                    <img src={item.img} alt='' />
                    <div className='details'>
                        <h1>{item.title}</h1>
                        <div className='price'>{item.quantity} x {item.price} ₽</div>
                    </div>
                    <DeleteOutlineIcon class='delete' onClick={() => dispatch(removeItem(item.id))} />
                </div>
            })}
            <div className='total'><span>SUBTOTAL</span><span>{totalPrice()} ₽</span></div>
            <div className='descWrapper'>
                <p className='description'>Andrey Alexev</p>
                <p className='description'>+7-999-99-999</p>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            <br />
            <span className='reset' onClick={() => {
                dispatch(resetCart());
            }}>Reset Cart</span>
            {isModalOpen && (
                <div className="full-page-modal">
                    <div className="full-page-modal-content">
                        <h2>Order has been successfully placed!</h2>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Cart;
