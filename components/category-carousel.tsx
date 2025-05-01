"use client"

import * as React from "react"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
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

interface CategoryCarouselProps {
  images: GalleryImage[]
  onImageClick: (index: number) => void
  title: string
}

export function CategoryCarousel({ images, onImageClick, title }: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
  }, [Autoplay({ delay: 4000 })])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#1457d8]">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {images.map((image, index) => (
            <div
              key={image._id}
              className="relative flex-[0_0_300px] md:flex-[0_0_400px] aspect-[4/3] group"
              onClick={() => onImageClick(index)}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <Image
                  src={image.image.url}
                  alt={image.heading}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-sm font-medium">{image.heading}</p>
                  <p className="text-xs">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

