import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import userAction from "../../../store/actions/userAction";

const AdminUserForm = ({
  update = false,
  toggleHandler,
  userName = "",
  userId,
}) => {
  const [name, setName] = useState(userName);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!update) {
      dispatch(
        userAction.create({
          name,
        })
      )
        .then(() => {
          toast.success("User created");
          router.push("/admin/users");
          return toggleHandler();
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      dispatch(userAction.update({ formData: { name }, userId }))
        .then(() => {
          toast.success("User successfully updated");
          router.push("/admin/users");
          return toggleHandler();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div className="users">
      <form onSubmit={handleSubmit}>
        <section
          className="card card-body border-0 shadow-sm p-4 mb-4"
          id="basic-info"
        >
          <h2 className="h4 mb-4">
            <i className="fas fa-info-circle text-primary fs-5 mt-n1 me-2" />
            {update ? "Update User" : "Add User"}
          </h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              placeholder="Name of user"
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

export default AdminUserForm;
