import React, { useEffect } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

const Product = ({ products, userCart, addItemToCart }) => {
  useEffect(() => {
    const getCart = async () => {
      await userCart();
    };
    getCart();
  }, []);

  return (
    <ul className="card__list">
      {products.map((product) => (
        <li className="card" key={product._id}>
          <Link
            className="link"
            to={{
              pathname: `/products/${product._id}`,
              state: {
                product: product,
              },
            }}
          >
            <div>
              <div className="card__image-container">
                <img
                  src={product.image_link}
                  alt={product.name}
                  className="card__image"
                />
              </div>
              <div className="card__info">
                <h3 className="card__info--name">{product.name}</h3>
                <p className="card__info--brand">{product.brand}</p>
                <p className="card__info--price">
                  {product.price_sign}
                  {product.price}
                </p>
              </div>
            </div>
          </Link>
          <div className="card__button-container">
            <button
              className="btn btn-buy"
              onClick={() => addItemToCart(product._id)}
            >
              <i className="fa fa-cart-plus"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default withAuth(Product);
