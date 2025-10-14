import React from "react";

function UploadImage({ image, imageUrl, onUrlChange, onImageChange }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-5 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Upload or Provide Image URL
      </h2>

      {(imageUrl || image) && (
        <div className="w-48 h-48 overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <img
            src={imageUrl || URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <label className="w-full flex flex-col items-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition">
        <span className="text-sm font-medium">📁 Choose an Image File</span>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </label>

      <div className="flex items-center w-full">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="mx-3 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <input
        type="text"
        placeholder="Paste image URL..."
        onChange={onUrlChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}

export default UploadImage;