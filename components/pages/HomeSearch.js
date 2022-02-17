import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const { categoryList } = useSelector((state) => state.category);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/listings?keyword=${keyword}`);
  };

  return (
    <form
      className="form-group d-block d-md-flex position-relative rounded-md-pill mb-2 mb-sm-4 mb-lg-5"
      onSubmit={handleSubmit}
    >
      <div className="input-group input-group-lg border-end-md col">
        <span className="input-group-text text-muted rounded-pill ps-3">
          <i className="fi-search" />
        </span>
        <input
          className="form-control"
          type="text"
          placeholder="What are you looking for?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <hr className="d-md-none my-2" />
      <div className="d-flex" style={{ minWidth: "200px" }}>
        <select
          className="form-select form-select-sm border-start"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categoryList.map((prov) => (
            <option value={prov._id} key={prov._id}>
              {prov.name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary btn-lg rounded-pill w-100 w-md-auto ms-sm-3"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default HomeSearch;
