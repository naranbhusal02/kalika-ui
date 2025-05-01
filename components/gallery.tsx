"use client"

import { useState, useEffect } from "react"
import { useAxios } from "@/app/hooks/useAxios"
import { ImageModal } from "./image-modal"
import { CategoryCarousel } from "./category-carousel"

interface GalleryImage {
  _id: string;
  image: {
    url: string;
    public_id: string;
  };
  heading: string;
  description: string;
  category: string;
}

export function Gallery() {
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>([])
  const [annualImages, setAnnualImages] = useState<GalleryImage[]>([])
  const [sportsImages, setSportsImages] = useState<GalleryImage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const axios = useAxios()
  const allImages = [...featuredImages, ...annualImages, ...sportsImages]

  useEffect(() => {
    const fetchImagesByCategory = async (category: string, setState: (images: GalleryImage[]) => void) => {
      try {
        const response = await axios.get(`/gallery/category/${category}`)
        setState(response.data)
      } catch (error) {
        console.error(`Error fetching ${category} gallery images:`, error)
      }
    }

    fetchImagesByCategory("featured", setFeaturedImages)
    fetchImagesByCategory("annual", setAnnualImages)
    fetchImagesByCategory("sport", setSportsImages)
  }, [])

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="w-10/12 mx-auto px-4 py-8">
      <ImageModal
        isOpen={isOpen}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
        image={allImages[currentImageIndex]}
      />

      <CategoryCarousel
        title="Featured Moments"
        images={featuredImages}
        onImageClick={(index) => openModal(index)}
      />

      <CategoryCarousel
        title="Annual Function"
        images={annualImages}
        onImageClick={(index) => openModal(index + featuredImages.length)}
      />

      <CategoryCarousel
        title="Sports Events"
        images={sportsImages}
        onImageClick={(index) => 
          openModal(index + featuredImages.length + annualImages.length)
        }
      />
    </div>
  )
}
