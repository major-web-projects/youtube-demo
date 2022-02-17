import React from "react";
import UserSignins from "../../components/dashboard/users/UserSignins";
import UserUpdatedPassword from "../../components/dashboard/users/UserUpdatedPassword";
import UserLayout from "../../components/layouts/users/UserLayout";

const DashboardSettingsPage = () => {
  return (
    <div className="password-security">
      <h1 className="h2">Password &amp; Security</h1>
      <p className="pt-1">
        Manage your password settings and secure your account.
      </p>
      <h2 className="h5">Password</h2>
      <UserUpdatedPassword />
      <div className="border-top pt-4 mt-3" />
      <h2 className="h5 pt-2 mb-4">Where you are signed in on</h2>
      <UserSignins />
    </div>
  );
};

DashboardSettingsPage.PageLayout = UserLayout;
export default DashboardSettingsPage;
