import React from "react";
import { withAuth } from "../lib/AuthProvider";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination__ul">
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={(currentPage === number ? "active " : "") + "controls"}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

export default withAuth(Pagination);
