import React from "react";

const ProductDetail = ({ location, history }) => {
  const {
    name,
    brand,
    price,
    image_link,
    price_sign,
    description,
  } = location.state.product;

  return (
    <div className="detail">
      <p onClick={() => history.push("/products")} className="detail__go-back">
        <i className="fa fa-arrow-left" />
        go back
      </p>
      <div className="detail__container">
        <img className="detail__image" src={image_link} alt={name} />
        <div className="detail__info">
          <h1 className="detail__name"> {name} </h1>
          <h3 className="detail__brand">{brand}</h3>
          <p className="detail__description">{description}</p>
          <p className="detail__price">
            {price_sign}
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
