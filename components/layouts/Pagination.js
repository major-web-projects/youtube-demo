import React, { useState, useEffect, Fragment, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const PagePaginator = (props) => {
  const {
    totalRecords = 0,
    pageLimit,
    totalPages = 0,
    pageNeighbours = 0,
    onPageChanged = (f) => f,
    currentPage,
  } = props;
  // const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const router = useRouter();
  // useEffect(() => {
  //   setTotalPages(Math.ceil(totalRecords / pageLimit));
  // }, [currentPage]);

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    // setCurrentPage(currentPage);
    onPageChanged(currentPage);
  };

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    // evt.preventDefault();
    gotoPage(currentPage - 1);
  };

  const handleMoveRight = (evt) => {
    // evt.preventDefault();
    gotoPage(currentPage + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

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

  const loadPages = () => setPages(fetchPageNumbers() || []);

  useEffect(() => {
    loadPages();
  }, [totalRecords, currentPage]);
  return (
    <Fragment>
      <nav
        className="d-flex justify-content-between pt-2"
        aria-label="Page navigation"
      >
        <ul className="pagination">
          <li className="page-item">
            <Link
              href={{
                query: { page: currentPage - 1, slug: router.query.slug },
              }}
              shallow
              scroll
              passHref
            >
              <a
                className="page-link"
                aria-label="Previous"
                onClick={handleMoveLeft}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="">Prev</span>
              </a>
            </Link>
          </li>
        </ul>
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className="page-item">
                  <Link
                    href={{
                      query: { page: currentPage - 1, slug: router.query.slug },
                    }}
                    shallow
                    scroll
                    passHref
                  >
                    <a
                      className="page-link"
                      aria-label="Previous"
                      onClick={handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </Link>
                </li>
              );

            if (page === RIGHT_PAGE)
              return (
                <li key={index} className="page-item">
                  <Link
                    href={{
                      query: { page: currentPage + 1, slug: router.query.slug },
                    }}
                    shallow
                    scroll
                    passHref
                  >
                    <a className="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </Link>
                </li>
              );

            return (
              <li
                key={index}
                className={`page-item${currentPage === page ? " active" : ""}`}
              >
                <Link
                  href={{ query: { page: page, slug: router.query.slug } }}
                  // shallow
                  scroll
                  passHref
                >
                  <button
                    className="page-link"
                    type="button"
                    // onClick={(e) => handleClick(page, e)}
                  >
                    {page}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="pagination">
          <li className="page-item">
            <Link
              href={{
                query: { page: currentPage + 1, slug: router.query.slug },
              }}
              shallow
              scroll
              passHref
            >
              <a
                className="page-link"
                aria-label="Next"
                onClick={handleMoveRight}
                disabled
              >
                <span className="">Next</span>{" "}
                <span aria-hidden="true">&raquo;</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default PagePaginator;
