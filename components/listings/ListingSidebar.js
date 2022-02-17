import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import listingAction from "../../store/actions/listingAction";

const ListingSidebar = ({ categories = [], subsList = [] }) => {
  const [price, setPrice] = useState({ gte: null, lte: null });
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e?.preventDefault();
    const query = { price, keyword, category, subs };
    dispatch(listingAction.search(query));
  };

  const onChange = (id) => {
    let selected = [...subs];

    // instead of using indexOf, we can use findIndex to look through array of objects
    let find = selected.findIndex((item) => item === id);

    if (find > -1) {
      selected.splice(find, 1);
    } else {
      // We can use find to get the item based on its id
      selected.push(id);
    }

    setSubs(selected);
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => {
      clearTimeout(delayed);
    };
  }, [category, subs]);

  return (
    <aside className="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2">
      <div className="">
        <div className="offcanvas-header d-flex d-lg-none align-items-center">
          <h2 className="h5 mb-0">Filters</h2>
          <button
            className="btn-close"
            type="button"
            data-bs-dismiss="offcanvas"
          />
        </div>
        {/* Search form*/}
        <div className="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
          <form
            className="form-group mb-lg-2 rounded-pill"
            onSubmit={handleSearch}
          >
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary rounded-pill d-lg-inline-block d-none"
              type="submit"
            >
              <i className="fas fa-search" />
            </button>
            <button
              className="btn btn-icon btn-primary rounded-circle flex-shrink-0 d-lg-none d-inline-flex"
              type="submit"
            >
              <i className="fas fa-search mt-n2" />
            </button>
          </form>
        </div>
        {/* Nav tabs*/}
        <div className="offcanvas-header d-block border-bottom py-lg-4 py-3 px-lg-0">
          <div className="pb-4 mb-2">
            <h3 className="h6">Location</h3>
            <select className="form-select mb-2">
              <option value="Berlin">Berlin</option>
              <option value="Hamburg">Hamburg</option>
              <option value="Munich">Munich</option>
              <option value="Koln">Koln</option>
              <option value="Frankfurt am Main">Frankfurt am Main</option>
            </select>
            <select className="form-select">
              <option value disabled="disabled">
                Choose district
              </option>
              <option value="Berlin-Mitte">Berlin-Mitte</option>
              <option value="Charlottenburg">Charlottenburg</option>
              <option value="Prenzlauer Berg">Prenzlauer Berg</option>
              <option value="Friedrichshain">Friedrichshain</option>
              <option value="Kreuzberg">Kreuzberg</option>
            </select>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Category</h3>
            <select
              className="form-select"
              id="ap-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubs([]);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Subcategory</h3>

            <div
              className="overflow-auto"
              data-simplebar="init"
              data-simplebar-auto-hide="false"
              style={{ height: "11rem" }}
            >
              <div className="simplebar-wrapper" style={{ margin: "0px" }}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer" />
                </div>
                <div className="simplebar-mask">
                  <div
                    className="simplebar-offset"
                    style={{ right: "0px", bottom: "0px" }}
                  >
                    <div
                      className="simplebar-content-wrapper"
                      style={{
                        height: "100%",
                        overflow: "hidden scroll",
                      }}
                    >
                      <div
                        className="simplebar-content"
                        style={{ padding: "0px" }}
                      >
                        {subsList
                          .filter((sub) => sub.category._id === category)
                          .map((cat) => {
                            return (
                              <div className="form-check" key={cat._id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={cat.slug}
                                  value={cat._id}
                                  onChange={() => onChange(cat._id)}
                                  selected={subs.includes(cat._id)}
                                />
                                <label
                                  className="form-check-label fs-sm"
                                  htmlFor="hotel"
                                >
                                  {cat.name}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <button className="btn btn-secondary" onClick={handleSearch}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Number of rooms</h3>
            <select className="form-select mb-2">
              <option value="1-room">1 room</option>
              <option value="2-rooms">2 rooms</option>
              <option value="3-rooms">3 rooms</option>
              <option value="4-rooms">4 rooms</option>
              <option value="5-rooms">5 rooms</option>
            </select>
          </div>
          <div className="border-top py-4">
            <button
              className="btn btn-outline-primary rounded-pill"
              type="button"
            >
              <i className="fas fa-rotate-right me-2" />
              Reset filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ListingSidebar;
