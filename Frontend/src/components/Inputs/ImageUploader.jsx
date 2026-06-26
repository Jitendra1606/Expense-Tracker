import React, { useRef } from "react";
import { LuCamera, LuTrash2 } from "react-icons/lu";

const ImageUploader = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100 bg-gray-100 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <LuCamera className="text-5xl text-gray-400" />
          )}
        </div>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-2 shadow hover:bg-red-600 transition"
          >
            <LuTrash2 size={16} />
          </button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        type="button"
        className="add-btn"
        onClick={() => inputRef.current.click()}
      >
        {preview ? "Change Image" : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUploader;
