import React, { Fragment, useState, useEffect } from "react";

import "../../style/Pagination.scss"

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

//e.g. range(1, 5) => [1, 2, 3, 4, 5]

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1)

  const { limit = 30, resultsTotal } = props;
  const pageLimit = typeof props.limit === "number" ? limit : 30;
  const totalRecords = typeof resultsTotal === "number" ? resultsTotal : 0;

  // pageNeighbours can be: 0, 1 or 2
  const pageNeighbours =
    typeof props.pageNeighbours === "number"
      ? Math.max(0, Math.min(props.pageNeighbours, 2))
      : 0;

  const totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(() => {
    console.log("use effect was called")
    setCurrentPage(props.currentPage)
  }, [])

  const gotoPage = page => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    props._updatePage(currentPage);
  };

  const handleClick = page => evt => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  // e.g. 10 pages in total and we set pageNeighbours to 2
  // if current page is 6

  // (1) < {4 5} [6] {7 8} > (10)

  const fetchPageNumbers = () => {
    console.log("fetch page numbers was called")
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <Fragment>
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );

            return (
              <li
                key={index}
                className={`page-item${
                  currentPage === page ? " active" : ""
                  }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={handleClick(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </Fragment>
  );
}
export default Pagination;