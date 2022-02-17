import React, { useState } from "react";
import AdminUserItem from "./AdminUserItem";

const AdminUserContainer = ({ users = [], handleRemove }) => {
  const [keyword, setKeyword] = useState("");

  const search = (keyword) => (user) =>
    user.name.toLocaleLowerCase().includes(keyword);
  return (
    <div className="user-list">
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
            {users.filter(search(keyword)).length} results
          </span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(search(keyword)).map((user, index) => (
              <AdminUserItem
                user={user}
                index={index}
                key={user._id + index}
                handleRemove={handleRemove}
                users={users}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserContainer;
