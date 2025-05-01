'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Import CSS files for react-slick
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Facility {
  id: number
  name: string
  description: string
  image: string
}

const facilities: Facility[] = [
  {
    id: 1,
    name: 'State-of-the-Art Library',
    description: 'Our modern library houses over 50,000 books and provides a quiet, inspiring space for study and research.',
    image: '/1.png?height=400&width=600'
  },
  {
    id: 2,
    name: 'Advanced Science Labs',
    description: 'Fully equipped laboratories for physics, chemistry, and biology to foster hands-on learning and scientific discovery.',
    image: '/2.png?height=400&width=600'
  },
  {
    id: 3,
    name: 'Multimedia Auditorium',
    description: 'A 500-seat auditorium with state-of-the-art audio-visual equipment for performances, lectures, and events.',
    image: '/3.png?height=400&width=600'
  },
  {
    id: 4,
    name: 'Sports Complex',
    description: 'Featuring an Olympic-sized swimming pool, indoor basketball court, and fully equipped gymnasium.',
    image: '/4.png?height=400&width=600'
  },
  {
    id: 5,
    name: 'Technology Center',
    description: 'A dedicated space for computer science, robotics, and digital media creation with the latest hardware and software.',
    image: '/5.png?height=400&width=600'
  },
  {
    id: 6,
    name: 'Technology Center',
    description: 'A dedicated space for computer science, robotics, and digital media creation with the latest hardware and software.',
    image: '/6.png?height=400&width=600'
  },
  {
    id: 7,
    name: 'Technology Center',
    description: 'A dedicated space for computer science, robotics, and digital media creation with the latest hardware and software.',
    image: '/7.png?height=400&width=600'
  }
]

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
      onClick={onClick}
    >
      <ChevronRight className="h-6 w-6 text-[#1457d8]" />
    </button>
  )
}

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
      onClick={onClick}
    >
      <ChevronLeft className="h-6 w-6 text-[#1457d8]" />
    </button>
  )
}

const FacilitiesCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
  }

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-8 text-center text-4xl font-bold text-[#1457d8]">Our Facilities</h2>
      <Slider {...settings}>
        {facilities.map((facility) => (
          <div key={facility.id} className="px-4 ">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="relative h-[500px]">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default FacilitiesCarousel as React.ComponentType

