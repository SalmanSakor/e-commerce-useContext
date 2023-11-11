import { Fragment, useContext } from "react";

import { CartContext } from "../../../contexts/cart.context";

import Button from "../../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <Fragment>
      <div className="product-card-container">
        <span className="price">{price} $</span>
        <img src={imageUrl} alt={`${name}`} />

        <div className="footer">
          <span>{name}</span>
        </div>
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to card
        </Button>
      </div>
    </Fragment>
  );
};

export default ProductCard;
