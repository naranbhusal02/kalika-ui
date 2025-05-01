'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from 'next/image'
import Confetti from 'react-confetti'

export function CelebrationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [confetti, setConfetti] = useState(false)

  useEffect(() => {
    setIsOpen(true)
    setConfetti(true)
    
    const timer = setTimeout(() => {
      setConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="relative w-full h-64">
          <Image
            src="/celeberation.jpeg"
            alt="Celebration"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mt-4">New Event: Summer Festival!</h2>
        <p className="text-center mt-2">Join us for a day of fun and learning on July 15th!</p>
        {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <audio autoPlay>
          <source src="/celebration-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </DialogContent>
    </Dialog>
  )
}

