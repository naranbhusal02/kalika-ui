import { useState } from 'react'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'featured' | 'annual' | 'sports'
}

export function useGallery(images: GalleryImage[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return {
    isOpen,
    currentImageIndex,
    openModal,
    closeModal,
    nextImage,
    previousImage,
  }
}

