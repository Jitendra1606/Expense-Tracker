import React, { useState } from "react";
import Input from "../Inputs/Input";
import ImageUploader from "../Inputs/ImageUploader";

const EditProfileForm = ({ user, onSave }) => {
  const [fullname, setFullname] = useState(user?.fullname || "");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(user?.profileImageUrl || null);

  return (
    <div>
      <ImageUploader
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
      />

      <div className="mt-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={fullname}
          onChange={({ target }) => setFullname(target.value)}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          onClick={() =>
            onSave({
              fullname,
              image,
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
