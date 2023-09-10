import meals from "../../assets/mealsImg.jpg";
import "./Header.css";
import HeaderCartBtn from "./HeaderCartBtn";
const Header = (props) => {
    return (
        <>
            <header className="header">
                <h1>ReactMeals</h1>
                <HeaderCartBtn onClick={props.onShowCart} />
            </header>
            <div className="main-img overlay">
                <img src={meals} alt="Meals Images" />
            </div>
        </>
    );
};
export default Header;
