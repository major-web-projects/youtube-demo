import React from "react";
import { connect } from "react-redux";
import ProfileContainer from "../../components/dashboard/profile/ProfileContainer";
import UserLayout from "../../components/layouts/users/UserLayout";

const DashboardIndexPage = ({ auth: { user } }) => {
  return (
    <div className="account">
      <h1 className="h2">Personal Info</h1>

      <ProfileContainer user={user} />
    </div>
  );
};

DashboardIndexPage.PageLayout = UserLayout;
export default connect((state) => ({ auth: state.auth }))(DashboardIndexPage);
