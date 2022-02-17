import React, { useState } from "react";
import AdminCategoryForm from "./AdminCategoryForm";

const AdminCategoryItem = ({ cat, index, handleRemove }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => setShowForm(!showForm);

  return showForm ? (
    <tr>
      <th scope="row">{index + 1}</th>
      <td colSpan="5">
        <AdminCategoryForm
          update
          toggleHandler={toggleShowForm}
          categoryName={cat.name}
          categoryId={cat._id}
        />
      </td>
    </tr>
  ) : (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{cat.name}</td>
      <td>{cat.slug}</td>
      <td>{cat.createdAt}</td>
      <td>{cat.updatedAt}</td>
      <td>
        <a className="text-primary me-2" type="button" onClick={toggleShowForm}>
          <i className="fas fa-edit"></i>
        </a>
        <a
          className="text-danger ml-2"
          type="button"
          onClick={() => handleRemove(cat._id)}
        >
          <i className="fas fa-trash"></i>
        </a>
      </td>
    </tr>
  );
};

export default AdminCategoryItem;
