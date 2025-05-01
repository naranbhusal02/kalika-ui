import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="School with mountains in background"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Nurturing Minds, Building Futures</h1>
        <p className="text-xl md:text-2xl mb-8">Welcome to Mountain View Academy</p>
        <Button size="lg">Learn More About Us</Button>
      </div>
    </div>
  )
}

