import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminUserContainer from "../../../components/dashboard/users/AdminUserContainer";
import UserLayout from "../../../components/layouts/users/UserLayout";

import userAction from "../../../store/actions/userAction";

const AdminUserIndexPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loadUsers = () => dispatch(userAction.list());
  const handleRemove = (userId) => {
    dispatch(userAction.remove(userId))
      .then(() => {
        toast.success("User deleted");
        return;
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const toggleShowCreateForm = () => setShowCreateForm(!showCreateForm);

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className="users">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0">Users</h1>

        <button
          className="fw-bold btn btn-primary"
          onClick={toggleShowCreateForm}
        >
          <i className="fa fa-plus mt-n1 me-2" />
          Add User
        </button>
      </div>
      <AdminUserContainer users={user.userList} handleRemove={handleRemove} />
    </div>
  );
};

AdminUserIndexPage.PageLayout = UserLayout;
export default AdminUserIndexPage;
