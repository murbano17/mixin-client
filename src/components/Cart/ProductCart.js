import React from "react";
import { withAuth } from "../../lib/AuthProvider";

const ProductCart = ({
  product,
  deleteProduct,
  addQuantity,
  removeQuantity,
}) => {

  return (
    <li className="cart__product-cart">
      <div className="cart__product-cart__image-container">
        <img
          src={product.product.image_link}
          alt={product.product.name}
          className="cart__product-cart__image"
        />
      </div>
      <div className="cart__product-cart__info">
        <h3 className="cart__product-cart__name">{product.product.name}</h3>
        <p className="cart__product-cart__price">
          {product.product.price_sign}
          {product.product.price}
        </p>
        <div className="cart__product-add">
          <p onClick={() => deleteProduct(product._id)} className="btn-remove">
            delete
          </p>
          <button
            className="btn-add"
            onClick={() => removeQuantity(product._id, product.quantity)}
          >
            -
          </button>
          <p className="cart__product-add--quantity">{product.quantity}</p>

          <button
            className="btn-add"
            onClick={() => addQuantity(product._id, product.quantity)}
          >
            +
          </button>
        </div>

        <div className="cart__product-cart__subtotal">
          <p>
            Subtotal:
            <span>
              {product.product.price_sign}
              {parseInt(product.quantity) * parseInt(product.product.price)}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};
export default withAuth(ProductCart);
