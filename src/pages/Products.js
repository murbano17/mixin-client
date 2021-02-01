import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import { withAuth } from "../lib/AuthProvider";
import services from "../lib/AuthService";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(40);

  const allProducts = async () => {
    setLoading(true);
    const allProducts = await services.products();
    setProducts(allProducts);
    setLoading(false);
  };

  const addItemToCart = async (id) => {
    await services.addproduct(id);
    await props.userCart();
  };

  useEffect(() => {
    allProducts();
  }, []);

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProducts - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProducts
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Product
        products={currentProducts}
        loading={loading}
        addItemToCart={addItemToCart}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {loading && <Spinner />}
    </div>
  );
};

export default withAuth(Products);
