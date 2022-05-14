import React from "react";
import { NavButton } from "./NavButton/NavButton";
import { connect } from "react-redux";
import { setCurrency, setCurrentCategory } from "../../redux/dataSlice";
import { cartIcon } from "../../assets/assets";
import { logoIcon } from "../../assets/assets";
import MiniCart from "./MiniCart/MiniCart";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartVisible: false,
    };
  }

  handleNavButtonClick(id) {
    this.props.setCurrentCategory(id);
  }
  handleCurrencyClick(id) {
    this.props.setCurrency(id);
  }
  handleCartClick() {
    this.setState({ cartVisible: !this.state.cartVisible });
  }
  handleCurtainClick() {
    this.setState({ cartVisible: false });
  }

  renderButton(id, category) {
    var state = id === category;
    return (
      <NavButton
        key={id}
        value={id}
        isActive={state}
        onClick={() => this.handleNavButtonClick(id)}
      />
    );
  }
  renderDropdown(value) {
    return (
      <button
        key={value.label}
        className="header__currency-dropdown-button"
        onClick={() => this.handleCurrencyClick(value)}
      >
        {value.symbol + " " + value.label}
      </button>
    );
  }

  render() {
    let category = this.props.category;
    let display = this.props.cartCounter ? "inline-block" : "none";
    let miniCart = this.state.cartVisible;
    return (
      <div className="header">
        <div className="header__button-container">
          {this.props.categories.map(({ name }) => {
            return this.renderButton(name, category);
          })}
        </div>
        <img id="logo-icon" src={logoIcon} alt="LOGO" />
        <div className="header__cart-container">
          {miniCart && <MiniCart onClick={() => this.handleCurtainClick()} />}
          <button className="header__cart-button" onClick={() => this.handleCartClick()}>
            <img className="header__cart-icon" src={cartIcon} alt="Cart" />
            <div style={{ display: display }} className="header__cart-counter">
              {this.props.cartCounter}
            </div>
          </button>
          <div className="header__currency-selector">
            {this.props.currency.symbol}
            <span className="header__currency-arrow">^</span>
            <div className="header__currency-dropdown">
              {this.props.currencies.map((value) => {
                return this.renderDropdown(value);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { data, cart } = state;
  return {
    categories: data.categories,
    currencies: data.currencies,
    category: data.currentCategory,
    currency: data.currency,
    cartCounter: cart.cartCounter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCategory: (value) => dispatch(setCurrentCategory(value)),
    setCurrency: (value) => dispatch(setCurrency(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
