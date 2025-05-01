'use client'

import { useState } from 'react'
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

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col p-0">
        <div className="relative flex-grow">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={images[currentImageIndex]}
              alt={`Question paper page ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 text-center">
          Page {currentImageIndex + 1} of {images.length}
        </div>
      </DialogContent>
    </Dialog>
  )
}

