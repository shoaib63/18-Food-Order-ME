import logo from '../assets/logo.jpg'
import Button from './UI/Button.jsx';


export default function Header() { 


    function handleShowItems(){
        console.log("show Items");
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="A resurant"/>
                <h1>ReactFoodME</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowItems} >Cart 0</Button>
            </nav>
        </header>
    );
}