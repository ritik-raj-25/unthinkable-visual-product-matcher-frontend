import React from 'react'
import ImageCard from './ImageCard'

function ShowSimilarImage({ similarImages = [], threshold }) {

  if (!threshold) {
    threshold = import.meta.env.VITE_SIMILARITY_THRESHOLD || 0.7
  }

  const filteredImages = similarImages.filter(
    (img) => img.similarityScore >= threshold
  )

  return (
    <div className="w-full mt-6">
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {filteredImages.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 text-lg font-medium">
          No similar images found above threshold ({Math.round(threshold * 100)}%)
        </div>
      )}
    </div>
  )
}

export default ShowSimilarImage