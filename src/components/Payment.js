import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { withAuth } from "../lib/AuthProvider";
import services from "../lib/AuthService";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_ID);

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const realAmount = amount * 100;
        const payment = await services.payment(id, realAmount);
        setMessage(payment.message);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment__form">
      <CardElement />
      <button disabled={!stripe} className="btn btn-secondary">
        {loading ? <span>Loading...</span> : "Buy"}
      </button>
      {message && <p className="payment__form-sucess"> {message}</p>}
    </form>
  );
};

const Payment = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default withAuth(Payment);
