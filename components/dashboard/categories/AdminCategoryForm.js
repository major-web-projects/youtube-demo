import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryAction from "../../../store/actions/categoryAction";

const AdminCategoryForm = ({
  update = false,
  toggleHandler,
  categoryName = "",
  categoryId,
}) => {
  const [name, setName] = useState(categoryName);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!update) {
      dispatch(
        categoryAction.create({
          name,
        })
      )
        .then(() => {
          toast.success("Category created");
          router.push("/admin/categories");
          return toggleHandler();
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      dispatch(categoryAction.update({ formData: { name }, categoryId }))
        .then(() => {
          toast.success("Category successfully updated");
          router.push("/admin/categories");
          return toggleHandler();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div className="categories">
      <form onSubmit={handleSubmit}>
        <section
          className="card card-body border-0 shadow-sm p-4 mb-4"
          id="basic-info"
        >
          <h2 className="h4 mb-4">
            <i className="fas fa-info-circle text-primary fs-5 mt-n1 me-2" />
            {update ? "Update Category" : "Add Category"}
          </h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              placeholder="Name of category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="form-text">48 characters left</span>
          </div>
          <section className="d-sm-flex justify-content-between pt-2">
            <button
              className="btn btn-outline-primary btn-lg d-block ps-3 mb-3 mb-sm-2"
              onClick={toggleHandler}
            >
              <i className="fas fa-eye-on me-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg d-block mb-2"
              href="real-estate-property-promotion.html"
            >
              Save
            </button>
          </section>
        </section>
      </form>
    </div>
  );
};

export default AdminCategoryForm;
