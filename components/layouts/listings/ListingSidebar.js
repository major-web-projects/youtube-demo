import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Accordion, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import listingAction from "../../../store/actions/listingAction";

const ListingSidebar = ({ categories = [], showFilters, setShowFilters }) => {
  const [price, setPrice] = useState({ gte: null, lte: null });
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const page = router.query.page;

  const handleReset = (e) => {
    e?.preventDefault();
    setPrice({ gte: "", lte: "" });
    setKeyword("");
    setCategory("");
  };

  const onChange = (id = null) => {
    let selected = [...category];

    // instead of using indexOf, we can use findIndex to look through array of objects
    let find = selected.findIndex((item) => item === id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      // We can use find to get the item based on its id
      if (id !== null) {
        selected.push(id);
      }
    }

    setCategory(selected);
  };

  const loadListings = useCallback(() => {
    return dispatch(
      listingAction.list({
        page,
        category,
        price,
        keyword,
      })
    ).catch((error) => toast.error(error));
  }, [page, category, price, keyword]);

  useEffect(() => {
    const delayed = setTimeout(() => {
      loadListings();
    }, 100);
    return () => {
      clearTimeout(delayed);
    };
  }, [loadListings]);

  return (
    <>
      <aside className="col-lg-3 px-4 border-top-lg ">
        <h2 className="h5 mb-0">Filters</h2>

        {/* Search form*/}
        <div className="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
          <form className="form-group mb-lg-2 rounded-pill">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className=" py-lg-4">
          <div className="pb-4 mb-2">
            <h3 className="h6">Categories</h3>

            <ul className="list-group list-group-flush">
              {categories.map((cat, index) => {
                return (
                  <li className="list-group-item" key={cat._id}>
                    <label>
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        id={cat.slug}
                        value={cat._id}
                        onChange={() => onChange(cat._id)}
                        selected={category.includes(cat._id)}
                      />
                      {cat.name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pb-4 mb-2">
            <h3 className="h6">Price</h3>
            <div className="d-flex align-items-center">
              <div className="pe-2">
                <label>Min</label>
                <input
                  className="form-control range-slider-value-min"
                  type="number"
                  value={price.gte}
                  onChange={(e) => setPrice({ ...price, gte: e.target.value })}
                />
              </div>
              <div className="text-muted">-</div>
              <div className="ps-2">
                <label>Max</label>
                <input
                  className="form-control range-slider-value-max"
                  type="number"
                  value={price.lte}
                  onChange={(e) => setPrice({ ...price, lte: e.target.value })}
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
      </aside>
    </>
  );
};

export default ListingSidebar;
