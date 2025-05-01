'use client'

import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog"
// import { SiteHeader } from "./site-header"
import { useRef, useEffect } from 'react'
import { ChevronRight, BookOpen, Users, Award } from 'lucide-react'
// import Confetti from 'react-confetti'
// import Image from 'next/image'
import Link from "next/link"
export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showModal, setShowModal] = useState(true)
  // const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }

    // const timer = setTimeout(() => {
    //   setShowConfetti(false)
    // }, 5000)

    // return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
                {/* {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} */}

      {/* Celebration Modal */}
      {/* <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogTitle></DialogTitle>
          <div className="relative w-full h-[400px]">
            <Image
              src="/celeberation.jpeg"
              alt="Best School of the Year Award"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center p-4">
            <h2 className="text-2xl font-bold text-[#1457d8]">Congratulations!</h2>
            <p className="mt-2">We are proud to announce that KMGSS has been awarded Best School of the Year!</p>
          </div>
          <audio autoPlay>
            <source src="/celebration.mp3" type="audio/mpeg" />
          </audio>
        </DialogContent>
      </Dialog> */}

      <div className="min-h-screen">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/newVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 " />

        {/* <SiteHeader /> */}

        <div className="container relative z-10 mx-auto flex flex-col justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block xl:inline">Welcome to</span>{' '}
              <span className="block text-white xl:inline">KMGSS</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Empowering minds, inspiring futures, and cultivating excellence in education since 1975.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link href={"/#courses"} >      
              <Button   size="lg" className="bg-[#1457d8] text-white hover:bg-yellow-400 transition-colors duration-300">
                Explore Programs
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              </Link>
              
              <Link href={"/contact"}>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900 transition-colors duration-300">
                Schedule a Visit
              </Button>
              </Link>
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-white" />}
                title="Academic Excellence"
                description="Rigorous curriculum designed to challenge and inspire students to reach their full potential."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-white" />}
                title="Supportive Community"
                description="A nurturing environment that fosters personal growth, teamwork, and lifelong friendships."
              />
              <FeatureCard
                icon={<Award className="h-8 w-8 text-white" />}
                title="Holistic Development"
                description="Comprehensive programs that develop well-rounded individuals ready for future success."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
      {icon}
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-300">{description}</p>
    </div>
  )
}

