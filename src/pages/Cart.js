import React, { useEffect } from "react";
import { withAuth } from "../lib/AuthProvider";
import services from "../lib/AuthService";
import ProductCart from "../components/Cart/ProductCart";
import { Link } from "react-router-dom";

const Cart = (props) => {
  useEffect(() => {
    const getCart = async () => {
      await props.userCart();
    };
    getCart();
  }, []);

  const deleteProduct = async (id) => {
    await services.delete(id);
    await props.userCart();
  };

  const getTotal = (array) => {
    let total = 0;
    array.map((oneProduct) => {
      let price = parseInt(oneProduct.product.price);
      const totalProduct = oneProduct.quantity * price;
      total += totalProduct;
    });
    return total;
  };

  const addQuantity = async (id, quantity) => {
    const finalQuantity = quantity + 1;
    await services.addquantity(id, finalQuantity);
    await props.userCart();
  };

  const removeQuantity = async (id, quantity) => {
    const finalQuantity = quantity - 1;
    if (finalQuantity === 0) {
      deleteProduct(id);
      await props.userCart();
    } else {
      await services.addquantity(id, finalQuantity);
      await props.userCart();
    }
  };

  return (
    <div className="cart">
      <div className="cart__container">
        <h1 className="cart__heading">your cart</h1>
        <ul className="cart__list">
          {props.cart.length > 0 ? (
            props.cart.map((product) => {
              return (
                <ProductCart
                  key={product._id}
                  product={product}
                  deleteProduct={deleteProduct}
                  addQuantity={addQuantity}
                  removeQuantity={removeQuantity}
                />
              );
            })
          ) : (
            <div className="cart__empty">
              <p className="cart__empty-text">Your cart is empty!</p>
              <Link to="/products">
                <button className="btn btn-secondary">See products</button>
              </Link>
            </div>
          )}
        </ul>

        {props.cart.length > 0 && (
          <div className="cart__total">
            <p className="cart__total-price">
              Total: <span>${getTotal(props.cart)}</span>
            </p>
          </div>
        )}

        {props.cart.length > 0 && (
          <Link
            to={{
              pathname: `/checkout`,
              state: {
                amount: getTotal(props.cart),
              },
            }}
          >
            <button className="btn-secondary">Check out</button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default withAuth(Cart);
