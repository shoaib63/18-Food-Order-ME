import logo from '../assets/logo.jpg'
import Button from './UI/Button.jsx';
import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';


export default function Header() { 

    const cartCtx = useContext(CartContext);
    const cartQuantity = cartCtx.items.reduce((total , item)=>{
        return total + item.quantity;
    }, 0); 

    const userProgressCtx = useContext(UserProgressContext);
    
    function handleShowItems(){
        userProgressCtx.showCart(); 
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="A resurant"/>
                <h1>ReactFoodME</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowItems} >Cart {cartQuantity}</Button>
            </nav>
        </header>
    );
}