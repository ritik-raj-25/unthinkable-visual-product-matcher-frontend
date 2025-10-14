import './App.css'
import UploadImage from './components/UploadImage'
import ShowSimilarImage from './components/ShowSimilarImage'
import { useQuery } from '@tanstack/react-query'
import imageSearchService from './services/imageSearchService'
import { useState, useEffect } from 'react'

function App() {
  const [productImage, setProductImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const threshold = import.meta.env.VITE_SIMILARITY_THRESHOLD || 0.7
  const [currentThreshold, setCurrentThreshold] = useState(threshold)

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ['similarImages', productImage, imageUrl],
    queryFn: () => imageSearchService.searchImages(imageUrl, productImage),
    enabled: false,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (productImage || imageUrl) refetch()
  }, [productImage, imageUrl])

  return (
    <div className='w-full bg-gray-50 min-h-screen flex flex-col items-center p-2'>
      <div className="max-w-[1280px] py-10 px-4 flex flex-col items-center w-full">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Visual Product Matcher
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Find similar products by uploading an image or entering an image URL.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          An assignment by{' '}
          <span className="font-semibold text-blue-600">
            Unthinkable Solutions
          </span>
        </p>
      </header>

      <UploadImage
        image={productImage}
        imageUrl={imageUrl}
        onUrlChange={(e) => setImageUrl(e.target.value)}
        onImageChange={(e) => setProductImage(e.target.files[0])}
      />

      <div className="flex flex-col items-center mt-8 w-full max-w-sm">
        <label className="text-gray-700 font-medium mb-2">
          Similarity Threshold: {Math.round(currentThreshold * 100)}%
        </label>
        <input
          type="range"
          min={threshold * 100}
          max={100}
          value={currentThreshold * 100}
          onChange={(e) => setCurrentThreshold(e.target.value / 100)}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="mt-6 text-red-500 font-medium">
          {error.message || 'Something went wrong!'}
        </p>
      )}

      {data && !isLoading && !isFetching && (
        <div className="mt-10 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Similar Images
          </h2>
          <ShowSimilarImage
            similarImages={data.sort((a, b) => b.similarityScore - a.similarityScore )}
            threshold={currentThreshold}
          />
        </div>
      )}
    </div>
    </div>
  )
}

export default App