import React, { useState } from "react";
import AdminUserForm from "./AdminUserForm";

const AdminUserItem = ({ user, index, handleRemove }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => setShowForm(!showForm);

  return showForm ? (
    <tr>
      <th scope="row">{index + 1}</th>
      <td colSpan="5">
        <AdminUserForm
          update
          toggleHandler={toggleShowForm}
          userName={user.name}
          userId={user._id}
        />
      </td>
    </tr>
  ) : (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.role}</td>
      <td>{user.createdAt}</td>
      <td>{user.updatedAt}</td>
      <td>
        <a className="text-primary me-2" type="button" onClick={toggleShowForm}>
          <i className="fas fa-edit"></i>
        </a>
        <a
          className="text-danger ml-2"
          type="button"
          onClick={() => handleRemove(user._id)}
        >
          <i className="fas fa-trash"></i>
        </a>
      </td>
    </tr>
  );
};

export default AdminUserItem;
