import React from "react";
import { withAuth } from "../lib/AuthProvider";
import CheckOutList from "../components/CheckOutList";
import Payment from "../components/Payment";

const Checkout = (props) => {
  const { amount } = props.location.state;
  return (
    <div className='checkout'>
      <CheckOutList amount={amount} />
      <Payment amount={amount} />
    </div>
  );
};
export default withAuth(Checkout);
