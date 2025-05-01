'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageViewerModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewerModal({ images, isOpen, onClose }: ImageViewerModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }, [images.length])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black">
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          <Image
            src={images[currentImageIndex]}
            alt={`Question paper page ${currentImageIndex + 1}`}
            fill
            className="object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            Page {currentImageIndex + 1} of {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

