import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Profile = () => {
  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>

        <p className="text-gray-500 mt-2">
          Manage your account information and security.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
