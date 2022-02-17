import React, { useState } from "react";
import AdminCategoryItem from "./AdminCategoryItem";

const AdminCategoryContainer = ({ categories = [], handleRemove }) => {
  const [keyword, setKeyword] = useState("");

  const search = (keyword) => (cat) =>
    cat.name.toLocaleLowerCase().includes(keyword);
  return (
    <div className="cat-list">
      <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
        <div className="d-flex align-items-center flex-shrink-0">
          <label className="fs-sm me-2 pe-1 text-nowrap" htmlFor="keyword">
            <i className="fi-arrows-sort text-muted mt-n1 me-2" />
            Filter by:
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <hr className="d-none d-sm-block w-100 mx-4" />
        <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
          <i className="fi-check-circle me-2" />
          <span className="fs-sm mt-n1">
            {categories.filter(search(keyword)).length} results
          </span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.filter(search(keyword)).map((cat, index) => (
              <AdminCategoryItem
                cat={cat}
                index={index}
                key={cat._id + index}
                handleRemove={handleRemove}
                categories={categories}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoryContainer;
