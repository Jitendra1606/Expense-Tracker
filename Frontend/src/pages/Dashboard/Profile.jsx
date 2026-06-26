import React, { useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../../components/Cards/CharAvatar";
import { LuCamera } from "react-icons/lu";
import Modal from "../../components/Modal";
import EditProfileForm from "../../components/Profile/EditProfileForm";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleProfileUpdate = async (profile) => {
    try {
      let profileImageUrl = user?.profileImageUrl || "";

      // Upload image if a new one is selected
      if (profile.image) {
        const formData = new FormData();
        formData.append("image", profile.image);

        const uploadResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        profileImageUrl = uploadResponse.data.imageUrl;
      }

      // Update profile
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        fullname: profile.fullname,
        profileImageUrl,
      });

      updateUser(response.data);

      toast.success("Profile updated successfully");

      setOpenEditModal(false);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="max-w-5xl mx-auto my-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

          <p className="text-gray-500 mt-2">
            Manage your profile information and account security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Card */}
          <div className="card flex flex-col items-center py-8">
            <div className="relative">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-100"
                />
              ) : (
                <CharAvatar
                  fullname={user?.fullname}
                  width="w-32"
                  height="h-32"
                  style="text-4xl"
                />
              )}

              <button
                className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
                title="Change Profile Photo"
              >
                <LuCamera className="text-lg" />
              </button>
            </div>

            <h2 className="text-xl font-semibold mt-5">{user?.fullname}</h2>

            <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          </div>

          {/* Right Card */}
          <div className="card lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={user?.fullname || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                />
              </div>

              <button
                className="add-btn add-btn-fill"
                onClick={() => setOpenEditModal(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Profile"
      >
        <EditProfileForm user={user} onSave={handleProfileUpdate} />
      </Modal>
    </DashboardLayout>
  );
};

export default Profile;
