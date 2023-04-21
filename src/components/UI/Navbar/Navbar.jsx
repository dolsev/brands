import React, {useState} from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Navbar.scss'
import Cart from "../../Cart/Cart";
import {useSelector} from "react-redux";

const Navbar = () => {
    const [open,setOpen] = useState(false)
    const products = useSelector(state=>state.cart.products)

    return (
        <div className='navbar'>
            <div className='wrapper'>
                <div className='left'>
                    <a href='/' className='logo'>The Brands</a>
                </div>
                <div className='right'>
                    <div className='icons'>
                        <div className='cartIcon' onClick={()=>setOpen(!open)}>
                            <ShoppingCartOutlinedIcon className='icon'/>
                            <span>{products.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            {open&&<Cart/>}
        </div>
    );
};

export default Navbar;

