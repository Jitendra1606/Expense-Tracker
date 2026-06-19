import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  // Reference to hidden file input
  const inputRef = useRef(null);

  // Preview URL for selected image
  const [previewUrl, setPreviewUrl] = useState(null);

  /**
   * Handle image selection
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Save actual file
      setImage(file);

      // Generate preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  /**
   * Remove selected image
   */
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  /**
   * Open file picker
   */
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative">
          {/* Default Avatar */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full relative bg-purple-100">
            <LuUser className="text-4xl text-primary" />
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white absolute -bottom-1 -right-1 cursor-pointer shadow-md"
          >
            <LuUpload size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Image Preview */}
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-300"
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white absolute -bottom-1 -right-1 cursor-pointer shadow-md"
          >
            <LuTrash size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
