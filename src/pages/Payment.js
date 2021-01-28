import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { withAuth } from "../lib/AuthProvider";
import services from "../lib/AuthService";

const stripePromise = loadStripe(
  "pk_test_51IDVojLhSBggkat8F8GoR1bsFDXbtqnvN7ImfpbMylmAImhyW4TYz1IbBd71yJHgr2c5vRgghArVyu7FqLE7kuCf00L9ISUDL3"
);

const Payment = (props) => {
  const { amount } = props.location.state;

  const ListOfProducts = () => {
    return (
      <div className="summary">
        <h3 className="summary__heading">Order summary</h3>
        {props.cart.map((oneProduct) => (
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
    );
  };

  const CheckoutForm = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        const { id } = paymentMethod;
        const realAmount = amount * 100;
        const payment = await services.payment(id, realAmount);
        console.log(payment);
      }
    };

    return (
      <form onSubmit={handleFormSubmit}>
        <CardElement />
        <button>Buy</button>
      </form>
    );
  };

  return (
    <>
      <ListOfProducts />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <p className="btn-back" onClick={() => props.history.goBack()}>
        go back
      </p>
    </>
  );
};
export default withAuth(Payment);
