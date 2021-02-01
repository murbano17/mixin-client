import React from "react";
import { withAuth } from "../lib/AuthProvider";

const CheckOutList = ({ amount, cart }) => {
  return (
    <div className="summary">
      <div className="summary__container">
        <h3 className="summary__heading">Order summary</h3>
        {cart.map((oneProduct) => (
          <div key={oneProduct._id} className="summary__product">
            <p className="summary__product-name">{oneProduct.product.name}</p>
            <p className="summary__product-quantity">
              Quantity: {oneProduct.quantity}
            </p>
            <p className="summary__product-price">
              {oneProduct.product.price_sign}
              {oneProduct.product.price}
            </p>
          </div>
        ))}
        <div className="summary__total">
          <p className="summary__total-title">Total:</p>
          <p className="summary__total-price">${amount}</p>
        </div>
      </div>
    </div>
  );
};
export default withAuth(CheckOutList);
