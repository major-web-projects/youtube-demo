import React, { useEffect } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const CategorySidebar = ({
  category,
  showFilters,
  setShowFilters,
  price,
  keyword,
  setPrice,
  setKeyword,
}) => {
  const handleReset = (e) => {
    e.preventDefault();
    setPrice({ gte: null, lte: null });
    setKeyword("");
  };

  return (
    <>
      <aside className="col-lg-3 pe-xl-4 border-top-lg ">
        <div
          className={`offcanvas offcanvas-start offcanvas-collapse ${
            showFilters && "show"
          }`}
          id="filters-sidebar"
          style={{ visibility: showFilters ? "visible" : "hidden" }}
        >
          <div className="offcanvas-header d-flex d-lg-none align-items-center">
            <h2 className="h5 mb-0">Filters</h2>
            <button
              className="btn-close"
              type="button"
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
          {/* Search form*/}
          <div className="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
            <form
              className="form-group mb-lg-2 rounded-pill"
              // onSubmit={handleSearch}
            >
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn rounded px-2" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            </form>
          </div>

          <div className="offcanvas-body py-lg-4">
            {/* Tabs content*/}

            {/* Filters*/}

            <div className="pb-4 mb-2">
              <h3 className="h6">Price</h3>
              <div className="d-flex align-items-center">
                <div className="pe-2">
                  <label>Min</label>
                  <input
                    className="form-control range-slider-value-min"
                    type="number"
                    value={price.gte}
                    onChange={(e) =>
                      setPrice({ ...price, gte: e.target.value })
                    }
                  />
                </div>
                <div className="text-muted">-</div>
                <div className="ps-2">
                  <label>Max</label>
                  <input
                    className="form-control range-slider-value-max"
                    type="number"
                    value={price.lte}
                    onChange={(e) =>
                      setPrice({ ...price, lte: e.target.value })
                    }
                  />
                </div>
                <div className="ps-2">
                  <label>&nbsp;</label>
                  <button
                    className="btn btn-outline-secondary px-2"
                    // onClick={handleSearch}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-top py-4">
              <button
                className="btn btn-outline-primary rounded-pill w-100"
                type="button"
                onClick={handleReset}
              >
                <i className="fas fa-rotate-right me-2" />
                Reset filters
              </button>
            </div>
          </div>
        </div>
        {showFilters && <div className={`offcanvas-backdrop fade show`}></div>}
      </aside>
    </>
  );
};

export default CategorySidebar;
