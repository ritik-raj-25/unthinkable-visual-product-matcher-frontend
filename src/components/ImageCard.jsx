import React from 'react'

function ImageCard({ image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-72 mx-auto border border-gray-100">
      <div className="w-full h-80 overflow-hidden">
        <img
          src={image.imageUrl}
          alt={image.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Category:</span> {image.category}
        </p>
        <p className="text-base font-semibold capitalize text-gray-800 truncate">
          {image.name}
        </p>
        <p className="text-sm">
          <span className="font-medium text-gray-700">Similarity Score:</span>{' '}
          <span
            className={`${
              image.similarityScore >= 0.8
                ? 'text-green-600'
                : image.similarityScore >= 0.5
                ? 'text-yellow-600'
                : 'text-red-600'
            } font-semibold`}
          >
            {Math.round(image.similarityScore * 100)}%
          </span>
        </p>
      </div>
    </div>
  )
}

export default ImageCard