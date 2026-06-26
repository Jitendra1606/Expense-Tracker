import React, { useState } from "react";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";

const ChangePasswordForm = ({ onChangePassword }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (key, value) => {
    setPasswords({
      ...passwords,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (!currentPassword.trim()) {
      toast.error("Current password is required");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("New password is required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    onChangePassword({
      currentPassword,
      newPassword,
    });

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <Input
        label="Current Password"
        type="password"
        placeholder="Enter current password"
        value={passwords.currentPassword}
        onChange={({ target }) => handleChange("currentPassword", target.value)}
      />

      <Input
        label="New Password"
        type="password"
        placeholder="Enter new password"
        value={passwords.newPassword}
        onChange={({ target }) => handleChange("newPassword", target.value)}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        value={passwords.confirmPassword}
        onChange={({ target }) => handleChange("confirmPassword", target.value)}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
