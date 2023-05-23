import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      onPageChange(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      onPageChange(prevPage);
    }
  };

  return (
    <div className="pagination-container">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Atras
      </button>
      <span>{`Pagina ${currentPage} de ${totalPages}`}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
