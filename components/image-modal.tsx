import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from "next/image"

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

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  image: GalleryImage
}

export function ImageModal({ isOpen, onClose, onPrevious, onNext, image }: ImageModalProps) {
  if (!image) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] p-0">
        <div className="relative w-full h-full">
          <Image
            src={image.image.url}
            alt={image.heading}
            fill
            className="object-contain"
          />
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <Button variant="ghost" size="icon" onClick={onPrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

