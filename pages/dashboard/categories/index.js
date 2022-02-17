import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminCategoryContainer from "../../../components/dashboard/categories/AdminCategoryContainer";
import AdminCategoryForm from "../../../components/dashboard/categories/AdminCategoryForm";
import UserLayout from "../../../components/layouts/users/UserLayout";
import categoryAction from "../../../store/actions/categoryAction";

const AdminCategoryIndexPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const loadCategories = () => dispatch(categoryAction.list());
  const handleRemove = (categoryId) => {
    dispatch(categoryAction.remove(categoryId))
      .then(() => {
        toast.success("Category deleted");
        return;
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const toggleShowCreateForm = () => setShowCreateForm(!showCreateForm);

  useEffect(() => {
    loadCategories();
  }, []);
  return (
    <div className="categories">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0">Categories</h1>

        <button
          className="fw-bold btn btn-primary"
          onClick={toggleShowCreateForm}
        >
          <i className="fa fa-plus mt-n1 me-2" />
          Add Category
        </button>
      </div>
      {showCreateForm && (
        <AdminCategoryForm toggleHandler={toggleShowCreateForm} />
      )}
      <AdminCategoryContainer
        categories={category.categoryList}
        handleRemove={handleRemove}
      />
    </div>
  );
};

AdminCategoryIndexPage.PageLayout = UserLayout;
export default AdminCategoryIndexPage;
