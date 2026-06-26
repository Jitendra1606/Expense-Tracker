import React, { useState } from "react";
import Input from "../Inputs/Input";

const EditProfileForm = ({ user, onSave }) => {
  const [fullname, setFullname] = useState(user?.fullname || "");

  return (
    <div>
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={fullname}
        onChange={({ target }) => setFullname(target.value)}
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          onClick={() =>
            onSave({
              fullname,
            })
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
