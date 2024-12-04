import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  handlePageClick,
}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <span className="previous" onClick={handlePreviousPage}>
          Previous
        </span>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index + 1}
          className={currentPage === index + 1 ? "current-page" : "page-number"}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      {currentPage < totalPages && (
        <span className="next" onClick={handleNextPage}>
          Next
        </span>
      )}
    </div>
  );
}
