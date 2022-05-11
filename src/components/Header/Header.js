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
      response: undefined,
      category: "",
      response2: undefined,
      cartVisible: false,
    };
  }
  handleClick(id) {
    this.props.setCurrentCategory(id);
  }
  handleCurrencyClick(id) {
    this.props.setCurrency(id);
  }
  handleCartClick() {
    this.setState({ cartVisible: !this.state.cartVisible });
  }
  handleClickCurtain() {
    this.setState({ cartVisible: false });
  }
  renderButton(id, category) {
    var state = id === category;
    return (
      <NavButton
        key={id}
        value={id}
        isActive={state}
        onClick={() => this.handleClick(id)}
      />
    );
  }
  renderDropdown(value) {
    return (
      <button
        key={value.label}
        className="dropdownButton"
        onClick={() => this.handleCurrencyClick(value)}
      >
        {value.symbol + " " + value.label}
      </button>
    );
  }
  renderMiniCart(state) {
    if (!state) return;
    else return <MiniCart onClick={() => this.handleClickCurtain()} />;
  }
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    const category = this.props.category;
    return (
      <div className="headerBox">
        <div className="buttonContainer">
          {this.props.categories.map(({ name }) => {
            return this.renderButton(name, category);
          })}
        </div>
        <img id="logoIcon" src={logoIcon} alt="LOGO" />
        <div className="cartContainer">
          {this.renderMiniCart(this.state.cartVisible)}
          <button
            className="cartMiniButton"
            onClick={() => this.handleCartClick()}
          >
            <img className="cartIcon" src={cartIcon} alt="Cart" />
            {this.props.cartCounter ? (
              <div className="cartMiniCounter">{this.props.cartCounter}</div>
            ) : (
              ""
            )}
          </button>
          <div className="currencySelector">
            {this.props.currency.symbol}
            <span className="currencyArrow">^</span>
            <div className="currencyDropdown">
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
  const { data } = state;
  const { cart } = state;
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
